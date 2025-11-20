'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';

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
  'Premium Coworking Space in Mumbai | Private Offices & Meeting Rooms - Alfa Business Center',
  'Flexible Workspace Solutions in Borivali | Hot Desks & Dedicated Desks',
  'Professional Business Center in Mumbai | Collaborative Workspace Environment',
];

const SUBTEXTS = [
  'Experience premium coworking spaces, private cabins, and meeting rooms in Borivali, Mumbai. Perfect for startups, freelancers, and established enterprises seeking flexible office solutions.',
  'Get access to state-of-the-art amenities, high-speed internet, and professional meeting rooms at our Borivali business center. Join Mumbai\'s growing community of professionals.',
  'Alfa Business Center offers the perfect blend of productivity and comfort in Borivali West. Modern workspace with all business amenities included in flexible monthly plans.'
];

type Slide = { src: string; title: string; subtitle: string };

const DURATION_MS = 5000;
const XFADE_MS = 280;

export default function HeroSection() {
  const slides: Slide[] = useMemo(
    () => images.map((src, i) => ({ 
      src, 
      title: headlines[i % headlines.length],
      subtitle: SUBTEXTS[i % SUBTEXTS.length]
    })),
    []
  );

  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

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
    <section className="relative w-full h-[90vh] overflow-hidden" role="banner" aria-label="Alfa Business Center Coworking Space">
      {/* JSON-LD Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BusinessCenter",
            "name": "Alfa Business Center",
            "description": "Premium coworking space in Borivali, Mumbai offering flexible workspace solutions including private offices, meeting rooms, and hot desks.",
            "url": "https://weworkoffice.in/",
            "telephone": "+91-98201-90836",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "400092",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "19.2307",
              "longitude": "72.8567"
            },
            "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
            "priceRange": "₹₹",
            "areaServed": ["Borivali", "Mumbai", "Maharashtra"]
          })
        }}
      />

      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 -z-10">
        <Image
          key={active.src}
          src={active.src}
          alt={`${active.title} - Alfa Business Center Borivali Mumbai`}
          fill
          priority={index === 0}
          className={[
            'object-cover object-center will-change-transform',
            'transition-opacity duration-500 ease-out',
            fadeIn ? 'opacity-100' : 'opacity-0',
            'kenburns',
            index % 2 === 0 ? 'kenburns-a' : 'kenburns-b',
          ].join(' ')}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </div>

      {/* Floating ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Location Badge with SEO-rich text */}
        <div
          className={[
            'mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
            'bg-[rgb(45,56,106)]/90 text-white shadow-lg backdrop-blur',
            fadeIn ? 'fade-up' : 'opacity-0',
          ].join(' ')}
        >
          <MapPin size={16} />
          <span>Premium Coworking Space in Borivali, Mumbai</span>
        </div>

        {/* Trust Badge */}
        <div
          className={[
            'mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
            'bg-green-600/90 text-white shadow-lg backdrop-blur',
            fadeIn ? 'fade-up delay-75' : 'opacity-0',
          ].join(' ')}
        >
          <Star size={16} fill="currentColor" />
          <span>Rated #1 Coworking Space in Borivali</span>
        </div>

        {/* Main H1 Heading - SEO Optimized */}
        <h1
          key={index + '-title'}
          className={[
            'max-w-6xl text-white drop-shadow-md',
            'text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight',
            fadeIn ? 'fade-up delay-100' : 'opacity-0 translate-y-2',
          ].join(' ')}
        >
          {active.title}
        </h1>

        {/* SEO-rich Subtitle */}
        <div
          key={index + '-sub'}
          className={[
            'mt-6 max-w-4xl text-gray-100 text-lg sm:text-xl leading-relaxed',
            fadeIn ? 'fade-up delay-200' : 'opacity-0 translate-y-2',
          ].join(' ')}
        >
          <p>{active.subtitle}</p>
        </div>

        {/* Key Features - SEO Rich */}
        <div className={['mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-200', fadeIn ? 'fade-up delay-300' : 'opacity-0'].join(' ')}>
          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur">
            ✅ Hot Desks from ₹5,999
          </span>
          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur">
            ✅ Private Cabins from ₹24,999
          </span>
          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur">
            ✅ Meeting Rooms Available
          </span>
          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur">
            ✅ High-Speed Internet
          </span>
        </div>

        {/* CTAs with SEO-optimized anchor texts */}
        <div className={['mt-8 flex flex-wrap items-center justify-center gap-4', fadeIn ? 'fade-up delay-400' : 'opacity-0'].join(' ')}>
          <Link 
            href="/tour" 
            className="group"
            aria-label="Book Free Tour of Coworking Space in Borivali Mumbai"
          >
            <button
              className={[
                'cursor-pointer rounded-lg px-6 py-2 text-base font-semibold',
                'bg-[rgb(45,56,106)] text-white shadow-2xl shadow-black/30',
                'transition-all hover:-translate-y-1 hover:shadow-3xl active:translate-y-0',
                'border-2 border-[rgb(45,56,106)] hover:border-white',
              ].join(' ')}
            >
              <span className="inline-flex items-center gap-3">
                Book Free Borivali Tour
                <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Link>

          <Link 
            href="/pricing" 
            className="group"
            aria-label="View Coworking Space Pricing Plans in Mumbai"
          >
            <button
              className={[
                'cursor-pointer rounded-lg px-6 py-2 text-base font-semibold',
                'bg-white/95 text-gray-900 backdrop-blur shadow-2xl shadow-black/20',
                'transition-all hover:-translate-y-1 hover:bg-white hover:shadow-3xl active:translate-y-0',
                'border-2 border-white/50 hover:border-white',
              ].join(' ')}
            >
              <span className="inline-flex items-center gap-2">
                View Pricing Plans
              </span>
            </button>
          </Link>
        </div>

        {/* Additional SEO CTA */}
        <div className={['mt-6', fadeIn ? 'fade-up delay-500' : 'opacity-0'].join(' ')}>
          <Link 
            href="/contact" 
            className="text-white/80 hover:text-white text-sm underline transition-colors"
            aria-label="Contact Alfa Business Center for Coworking Space in Borivali"
          >
            Call +91-98201-90836 for Immediate Assistance
          </Link>
        </div>

        {/* Bottom controls */}
        <div className="pointer-events-auto absolute bottom-8 left-0 right-0 mx-auto flex w-full max-w-4xl items-center justify-between px-4">
          <button
            onClick={prev}
            aria-label="Previous slide of coworking space images"
            className="rounded-full bg-white/90 cursor-pointer p-3 text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="mx-4 flex flex-1 items-center gap-4">
            <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-white/30">
              <span key={index + '-progress'} className="block h-full w-0 bg-white/90 progress" />
            </div>

            <div className="flex items-center gap-2">
              {slides.map((_, i) => {
                const activeDot = i === index;
                return (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    aria-label={`View slide ${i + 1} of coworking space`}
                    className={[
                      'h-3 rounded-full transition-all cursor-pointer',
                      activeDot ? 'w-8 bg-white' : 'w-3 bg-white/60 hover:bg-white/80',
                    ].join(' ')}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Next slide of coworking space images"
            className="rounded-full cursor-pointer bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Alfa Business Center - Premium Coworking Space in Borivali, Mumbai</h2>
        <p>
          Alfa Business Center is a premium coworking space located in Borivali West, Mumbai, 
          offering flexible workspace solutions including hot desks, dedicated desks, private cabins, 
          and professional meeting rooms. Our business center is strategically situated in Dattani Tower, 
          Kore Kendra, next to McDonald's in Borivali West, Mumbai, providing easy access for professionals 
          from across the city.
        </p>
        <p>
          We serve startups, freelancers, SMEs, and established enterprises looking for affordable 
          yet premium office space solutions in Mumbai. Our coworking space features high-speed internet, 
          modern amenities, 24/7 access, and a vibrant community of like-minded professionals.
        </p>
        <p>
          Contact us today at +91-98201-90836 or visit our Borivali location to book a free tour 
          of our coworking facilities and discover the perfect workspace solution for your business needs.
        </p>
      </div>

      <style jsx>{`
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

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fade-up { animation: fadeUp 800ms cubic-bezier(.2,.7,.2,1) both; }
        .delay-75 { animation-delay: 75ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }

        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .progress { animation: progress ${DURATION_MS}ms linear forwards; }

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

        @media (prefers-reduced-motion: reduce) {
          .kenburns-a, .kenburns-b, .fade-up, .progress, .orb-1, .orb-2 {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}