'use client';

import { useEffect, useState } from 'react';
import { Clock3, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const getTimeRemaining = (endTime: number) => {
  const total = endTime - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  return {
    total,
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
};

export default function LimitedOfferBanner() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeRemaining(Date.now() + 1000 * 60 * 60 * 24)
  );
  const [expired, setExpired] = useState(false);

  // ✅ Fix: Store endTime once
  useEffect(() => {
    const endTime = Date.now() + 1000 * 60 * 60 * 24; // 24 hours from now

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(endTime);
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        clearInterval(interval);
        setExpired(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (expired) return null;

  return (
    <div className="px-4 md:px-8 mt-16">
      <div className="bg-[#2d386a] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl animate-in fade-in">
        {/* Left: Offer Text */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <Sparkles className="text-white animate-bounce" size={28} />
          <p className="text-lg md:text-xl font-semibold">
            Limited Time Offer: Get{" "}
            <span className="underline underline-offset-2">20% off</span> your
            first 3 months on any annual plan!
          </p>
        </div>

        {/* Middle: Countdown Timer */}
        <div className="flex items-center gap-2 text-lg md:text-2xl font-bold text-white">
          <Clock3 size={24} />
          <span>{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</span>
        </div>

        {/* Right: CTA Button */}
        <button
          onClick={() => router.push('/payment')}
          className="bg-white text-[#2d386a] cursor-pointer font-semibold text-sm md:text-base px-5 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg animate-pulse"
        >
          Claim Your Discount Now!
        </button>
      </div>
    </div>
  );
}
