'use client';

import { useEffect, useRef, useState } from 'react';
import TestimonialCard from '../reusable/TestimonialCard';
import TestimonialSkeleton from "../skeleton/TestimonialSkeleton";


type Testimonial = {
  message: string;
  name: string;
  title: string;
  image: string;
  status: string;
  companyLogo: string;
};

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1); // center item among clones
  const [isHovered, setIsHovered] = useState(false);

  // --- responsive card width (card + gap) ---
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 376; // fallback
    if (window.innerWidth < 640) return 320 + 24; // card 320 + gap ~24
    if (window.innerWidth < 1024) return 360 + 24; // card 360 + gap ~24
    return 400 + 24; // card 400 + gap ~24
  };
  const [cardWidth, setCardWidth] = useState(getCardWidth());

  useEffect(() => {
    const onResize = () => setCardWidth(getCardWidth());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // --- Fetch testimonials (approved only) ---
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        setTestimonialsData(data.filter((t: Testimonial) => t.status === "approved"));
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false); // ✅ loading complete
      }
    };
    fetchTestimonials();
  }, []);


  // --- clones for infinite loop (only when >1 item) ---
  const hasLoop = testimonialsData.length > 1;
  const extended = hasLoop
    ? [testimonialsData[testimonialsData.length - 1], ...testimonialsData, testimonialsData[0]]
    : testimonialsData;

  // --- center a given index (within extended array) ---
  const scrollToIndex = (index: number, smooth = true) => {
    const container = scrollRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const left = cardWidth * index - (containerWidth - (cardWidth - 24)) / 2; // center approx
    container.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  };

  // --- initial centering after data load ---
  useEffect(() => {
    if (!testimonialsData.length) return;
    if (hasLoop) {
      setCurrentIndex(1); // because of leading clone
      scrollToIndex(1, false);
    } else {
      setCurrentIndex(0);
      scrollToIndex(0, false);
    }
  }, [testimonialsData]); // eslint-disable-line

  // --- keep centered after resize ---
  useEffect(() => {
    if (!extended.length) return;
    scrollToIndex(currentIndex, false);
  }, [cardWidth]); // eslint-disable-line

  // --- infinite loop correction (jump without animation at edges) ---
  useEffect(() => {
    if (!hasLoop) return;
    if (currentIndex === 0) {
      const real = testimonialsData.length; // last real item
      setTimeout(() => {
        setCurrentIndex(real);
        scrollToIndex(real, false);
      }, 250);
    }
    if (currentIndex === testimonialsData.length + 1) {
      setTimeout(() => {
        setCurrentIndex(1);
        scrollToIndex(1, false);
      }, 250);
    }
  }, [currentIndex, hasLoop, testimonialsData.length]); // eslint-disable-line

  // --- auto-scroll (paused on hover) ---
  useEffect(() => {
    if (!hasLoop || !extended.length || isHovered) return;
    const id = setInterval(() => {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      scrollToIndex(next);
    }, 5000);
    return () => clearInterval(id);
  }, [currentIndex, extended.length, hasLoop, isHovered]); // eslint-disable-line

  // --- dots logic (map to real items, not clones) ---
  const activeDot =
    testimonialsData.length > 0
      ? ((currentIndex - 1 + testimonialsData.length) % testimonialsData.length)
      : 0;

  const goToDot = (i: number) => {
    if (!hasLoop) {
      setCurrentIndex(0);
      scrollToIndex(0);
      return;
    }
    const target = i + 1; // because of leading clone
    setCurrentIndex(target);
    scrollToIndex(target);
  };

  return (
    <section className="relative py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          What Our Clients Say
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Hear real stories from our happy customers who trusted us with their journey.
        </p>
      </div>
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          className="flex items-stretch py-4 gap-6 select-none overflow-hidden"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))
            : extended.map((item, index) => {
              const isActive = hasLoop ? currentIndex === index : index === 0;
              return (
                <div
                  key={index}
                  className={[
                    "flex-shrink-0",
                    "w-[320px] sm:w-[360px] md:w-[400px]",
                    "snap-center",
                    "transition-all duration-700 ease-in-out",
                    isActive
                      ? "scale-100 md:scale-105 opacity-100 z-10"
                      : "scale-95 opacity-60 z-0",
                  ].join(" ")}
                >
                  <TestimonialCard {...item} />
                </div>
              );
            })}
        </div>

        {/* Dots Navigation (click to center) */}
        {!loading && (
          <div className="mt-6 flex justify-center gap-2">
            {testimonialsData.map((_, i) => {
              const isActiveDot = i === activeDot;
              return (
                <button

                  key={i}
                  onClick={() => goToDot(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={[
                    "h-2 rounded-full cursor-pointer transition-all duration-300",
                    isActiveDot ? "w-6 bg-gray-900" : "w-2 bg-gray-400/50 hover:bg-gray-500/70",
                  ].join(" ")}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
