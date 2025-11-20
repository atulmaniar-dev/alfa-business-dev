'use client';

import { useEffect, useState } from 'react';
import { Clock3, Sparkles, MapPin } from 'lucide-react';
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

  // Structured Data for Special Offer
  const offerStructuredData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Limited Time Offer - 20% Off Coworking Space",
    "description": "Get 20% off your first 3 months on any annual plan at Alfa Business Center in Borivali, Mumbai",
    "url": "https://weworkoffice.in/payment",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "validFrom": new Date().toISOString().split('T')[0],
    "validThrough": new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split('T')[0],
    "priceSpecification": {
      "@type": "PriceSpecification",
      "description": "20% discount on first 3 months of annual plan"
    },
    "areaServed": {
      "@type": "City",
      "name": "Mumbai",
      "containsPlace": {
        "@type": "Place",
        "name": "Borivali West"
      }
    }
  };

  if (expired) return null;

  return (
    <div className="w-full flex justify-center px-4 py-6 md:px-8 mt-16" 
         itemScope 
         itemType="https://schema.org/Offer"
         aria-label="Limited Time Offer for Coworking Space in Borivali Mumbai">
      
      {/* Structured Data for Special Offer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerStructuredData) }}
      />

      <div className="w-full max-w-7xl">
        <div className="bg-[#2d386a] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl animate-in fade-in mx-auto"
             itemScope 
             itemType="https://schema.org/Discount">
          
          {/* Hidden structured data properties */}
          <meta itemProp="discountCode" content="FIRST3MONTHS20" />
          <meta itemProp="description" content="20% discount on first 3 months of annual coworking plan" />
          
          {/* Left: Offer Text */}
          <div className="flex items-center gap-4 text-center md:text-left flex-1">
            <Sparkles className="text-white animate-bounce" size={28} />
            <div>
              <p className="text-lg md:text-xl font-semibold" itemProp="name">
                Limited Time Offer for Borivali Professionals: Get{" "}
                <span className="underline underline-offset-2" itemProp="discount">20% off</span> your
                first 3 months on any annual plan!
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
                <MapPin size={14} />
                <span>Applicable at our Borivali, Mumbai location only</span>
              </div>
            </div>
          </div>

          {/* Middle: Countdown Timer */}
          <div className="flex items-center gap-2 text-lg md:text-2xl font-bold text-white flex-shrink-0"
               aria-label="Offer countdown timer">
            <Clock3 size={24} aria-hidden="true" />
            <span>{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</span>
            <meta itemProp="validThrough" content={new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()} />
          </div>

          {/* Right: CTA Button */}
          <button
            onClick={() => router.push('/payment')}
            className="bg-white text-[#2d386a] cursor-pointer font-semibold text-sm md:text-base px-5 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg animate-pulse flex-shrink-0"
            aria-label="Claim 20% discount on coworking space in Borivali Mumbai"
            itemProp="url"
          >
            Claim Your Borivali Discount!
          </button>
        </div>

        {/* Hidden SEO content for search engines */}
        <div className="sr-only" aria-hidden="true">
          <h2>Limited Time Offer - Alfa Business Center Borivali Mumbai</h2>
          <p>
            Special limited time offer: Get 20% discount on your first 3 months when you choose 
            any annual plan at Alfa Business Center in Borivali, Mumbai. This exclusive offer 
            is perfect for startups, freelancers, and businesses looking for premium coworking 
            space solutions in Mumbai.
          </p>
          <p>
            <strong>Offer Details:</strong>
          </p>
          <ul>
            <li>20% discount on first 3 months of annual plan</li>
            <li>Applicable on all workspace types: Hot Desks, Dedicated Desks, Private Cabins</li>
            <li>Includes all premium amenities and high-speed internet</li>
            <li>Perfect for Mumbai professionals seeking affordable workspace</li>
            <li>Limited time offer - expires in 24 hours</li>
          </ul>
          <p>
            <strong>Location:</strong> Alfa Business Center, Dattani Tower, Kore Kendra, 
            Borivali West, Mumbai - 400092
          </p>
          <p>
            <strong>Contact:</strong> Call +91-98201-90836 to avail this offer
          </p>
          <p>
            Keywords: coworking space offer borivali, office space discount mumbai, 
            limited time deal business center, shared workspace promotion, 
            Alfa Business Center special offer, borivali coworking discount
          </p>
        </div>
      </div>
    </div>
  );
}