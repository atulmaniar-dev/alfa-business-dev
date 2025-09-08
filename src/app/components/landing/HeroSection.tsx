'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/DSC06434.JPG',
  '/DSC06439.JPG',
  '/DSC06440.JPG',
  '/DSC06448.JPG',
  '/DSC06451.JPG',
  '/DSC06454.JPG',
  '/DSC06458.JPG',
  '/DSC06462.JPG',
];

const headlines = [
  'Welcome to Alfaesol Business Center',
  'Explore Innovative Courses On Campus',
  'The Collaboration of a Talented Community',
];

const SUBTEXT =
  'At our coworking space center, we emphasize comfy conditions for creative minds that form groups of talented people.';

type Slide = { src: string; title: string };

const DURATION_MS = 5000;     // how long each slide stays
const XFADE_MS = 280;         // fade out time before switching

export default function HeroSection() {
  // Build slides by cycling headlines over images (so lengths can differ safely)
  const slides: Slide[] = useMemo(
    () => images.map((src, i) => ({ src, title: headlines[i % headlines.length] })),
    []
  );

  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- autoplay (no hover pause) ---
  useEffect(() => {
    // Clear any previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Schedule the next slide
    timerRef.current = setTimeout(() => {
      next();
    }, DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, slides.length]);

  const jumpTo = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFadeIn(false);
    setTimeout(() => {
      setIndex(i);
      setFadeIn(true);
    }, XFADE_MS);
  };

  const next = () => {
    setFadeIn(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setFadeIn(true);
    }, XFADE_MS);
  };

  const prev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
      setFadeIn(true);
    }, XFADE_MS);
  };

  const active = slides[index];

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 -z-10">
        <Image
          key={active.src} // remount to restart Ken Burns per slide
          src={active.src}
          alt={active.title}
          fill
          priority={index === 0}
          className={[
            'object-cover object-center will-change-transform',
            'transition-opacity duration-500 ease-out',
            fadeIn ? 'opacity-100' : 'opacity-0',
            // Ken Burns effect
            'kenburns',
            index % 2 === 0 ? 'kenburns-a' : 'kenburns-b', // slight alternation
          ].join(' ')}
        />
        {/* Subtle vignette & gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />
      </div>

      {/* Floating ambient orbs (pure CSS) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <div
          className={[
            'mb-3 inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold',
            'bg-[rgb(45,56,106)]/85 text-white shadow-md backdrop-blur',
            fadeIn ? 'fade-up' : 'opacity-0',
          ].join(' ')}
        >
          Limited Seats Available!
        </div>

        {/* Headline */}
        <h1
          key={index + '-title'}
          className={[
            'max-w-4xl text-white drop-shadow',
            'text-3xl sm:text-5xl font-extrabold leading-tight',
            fadeIn ? 'fade-up' : 'opacity-0 translate-y-2',
          ].join(' ')}
        >
          {active.title}
        </h1>

        {/* Subtext */}
        <p
          key={index + '-sub'}
          className={[
            'mt-4 max-w-2xl text-gray-200',
            'text-base sm:text-lg',
            fadeIn ? 'fade-up delay-100' : 'opacity-0 translate-y-2',
          ].join(' ')}
        >
          {SUBTEXT}
        </p>

        {/* CTAs */}
        <div className={['mt-8 flex flex-wrap items-center justify-center gap-4', fadeIn ? 'fade-up delay-200' : 'opacity-0'].join(' ')}>
          <Link href="/tour" className="group">
            <button
              className={[
                'cursor-pointer rounded-md px-6 py-3 text-sm font-medium',
                'bg-[rgb(45,56,106)] text-white shadow-lg shadow-black/20',
                'transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0',
              ].join(' ')}
            >
              <span className="inline-flex items-center gap-2">
                Book Free Tour
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </Link>

          <Link href="/amenities" className="group">
            <button
              className={[
                'cursor-pointer rounded-md px-6 py-3 text-sm font-medium',
                'bg-white/90 text-black backdrop-blur shadow-lg shadow-black/10',
                'transition-all hover:-translate-y-0.5 hover:bg-white active:translate-y-0',
              ].join(' ')}
            >
              View Amenities
            </button>
          </Link>
        </div>

        {/* Bottom controls: arrows + progress + dots */}
        <div className="pointer-events-auto absolute bottom-6 left-0 right-0 mx-auto flex w-full max-w-4xl items-center justify-between px-4">
          {/* Arrows (always available; no hover dependency, no autoplay pause) */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="rounded-full bg-white/85 cursor-pointer p-2 text-gray-900 shadow transition hover:bg-white"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Progress + dots */}
          <div className="mx-3 flex flex-1 items-center gap-4">
            {/* Progress bar */}
            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/30">
              <span key={index + '-progress'} className="block h-full w-0 bg-white/90 progress" />
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => {
                const activeDot = i === index;
                return (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={[
                      'h-2 rounded-full transition-all cursor-pointer',
                      activeDot ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80',
                    ].join(' ')}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Next slide"
            className="rounded-full cursor-pointer bg-white/85 p-2 text-gray-900 shadow transition hover:bg-white"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Component-scoped styles (keyframes + orbs + reduced motion) */}
      <style jsx>{`
        /* Ken Burns variants */
        @keyframes kenburnsA {
          0% { transform: scale(1.08) translate3d(0, 0, 0); }
          100% { transform: scale(1.18) translate3d(0, -1.5%, 0); }
        }
        @keyframes kenburnsB {
          0% { transform: scale(1.08) translate3d(0, 0, 0); }
          100% { transform: scale(1.18) translate3d(0, 1.5%, 0); }
        }
        .kenburns.kenburns-a { animation: kenburnsA ${DURATION_MS}ms ease-in-out forwards; }
        .kenburns.kenburns-b { animation: kenburnsB ${DURATION_MS}ms ease-in-out forwards; }

        /* Text entrance */
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(8px) scale(0.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fade-up { animation: fadeUp 700ms cubic-bezier(.2,.7,.2,1) both; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }

        /* Progress bar */
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .progress { animation: progress ${DURATION_MS}ms linear forwards; }

        /* Ambient floating orbs for "alive" feeling */
        .orb {
          position: absolute;
          width: 40vmin;
          height: 40vmin;
          border-radius: 9999px;
          filter: blur(48px);
          opacity: 0.18;
          pointer-events: none;
        }
        .orb-1 {
          background: radial-gradient(circle at 30% 30%, #8ea2ff, transparent 60%);
          top: 10%;
          left: -10%;
          animation: float1 14s ease-in-out infinite alternate;
        }
        .orb-2 {
          background: radial-gradient(circle at 70% 70%, #a0ffe6, transparent 60%);
          bottom: -10%;
          right: -10%;
          animation: float2 16s ease-in-out infinite alternate;
        }
        @keyframes float1 {
          from { transform: translate3d(0,0,0) scale(1); }
          to   { transform: translate3d(4%, -3%, 0) scale(1.08); }
        }
        @keyframes float2 {
          from { transform: translate3d(0,0,0) scale(1); }
          to   { transform: translate3d(-4%, 3%, 0) scale(1.05); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .kenburns-a, .kenburns-b, .fade-up, .progress, .orb-1, .orb-2 {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
