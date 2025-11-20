'use client';
import React from 'react';
import Link from 'next/link';
import { Home, Mail, Search, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  // Common pages that users might be looking for
  const popularPages = [
    { name: 'Coworking Spaces Mumbai', path: '/plans/hot-desk' },
    { name: 'Private Offices Borivali', path: '/plans/private-cabin' },
    { name: 'Meeting Rooms', path: '/plans/conference-room--meeting-room' },
    { name: 'Pricing Plans', path: '/plans' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'About Alfa Business Center', path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-white px-4 py-10 text-center">
      
      {/* SEO: Hidden H1 for search engines */}
      <h1 className="sr-only">Page Not Found - Alfa Business Center | Coworking Space in Mumbai, Borivali</h1>
      
      {/* Visible Heading for Users */}
      <h2 className="text-3xl md:text-6xl font-bold text-[#2d386a] mb-3">
        Oops! You&apos;re a little lost.
      </h2>

      {/* Illustration */}
      <div className="relative mb-8">
        <img
          src="/lost-image.png"
          alt="Page not found - Alfa Business Center Coworking Space Mumbai"
          className="w-70 h-auto mb-6"
        />
      </div>

      {/* Description with SEO keywords */}
      <div className="max-w-2xl mx-auto mb-8">
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          The page you&apos;re trying to access doesn&apos;t exist. It might have been removed,
          renamed, or never existed in the first place.
        </p>
        
        {/* Location mention for local SEO */}
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <MapPin size={16} />
          <span className="text-sm">
            Looking for coworking spaces in <strong>Borivali, Mumbai</strong>?
          </span>
        </div>
      </div>

      {/* Popular Pages Suggestions - Great for SEO & UX */}
      <div className="max-w-2xl mx-auto mb-8">
        <h3 className="text-lg font-semibold text-[#2d386a] mb-4 flex items-center justify-center gap-2">
          <Search size={20} />
          Popular Pages You Might Be Looking For:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {popularPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-[#2d386a] hover:shadow-md transition-all duration-200 text-left"
            >
              <span className="text-[#2d386a] font-medium text-sm">{page.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#2d386a] hover:bg-[#1f2a4e] text-white px-6 py-3 rounded-lg font-medium transition transform hover:scale-105"
          aria-label="Return to Alfa Business Center homepage"
        >
          <Home size={18} /> 
          Back to Homepage
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:border-[#2d386a] transition transform hover:scale-105"
          aria-label="Contact Alfa Business Center support"
        >
          <Mail size={18} /> 
          Contact Support
        </Link>
      </div>

      {/* SEO: Hidden content for search engines */}
      <div className="sr-only">
        <h2>Alfa Business Center - Premium Coworking Space</h2>
        <p>
          Alfa Business Center is a premium coworking space located in Borivali West, Mumbai. 
          We offer flexible workspace solutions including hot desks, dedicated desks, private cabins, 
          and meeting rooms. Our business center is conveniently situated in Dattani Tower, 
          Kore Kendra, next to McDonald's in Borivali West, Mumbai, Maharashtra 400092.
        </p>
        <p>
          Services include: Coworking spaces Mumbai, Private offices Borivali, Meeting rooms Mumbai, 
          Virtual office solutions, Business center amenities, Flexible workspace Mumbai.
        </p>
        <p>
          Contact us at +91-98201-90836 or email info@alfaesol.com for booking a tour of our 
          coworking space in Borivali, Mumbai.
        </p>
      </div>

      {/* JSON-LD Structured Data for 404 Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Page Not Found - Alfa Business Center",
            "description": "404 error page for Alfa Business Center - Premium coworking space in Borivali, Mumbai",
            "url": "https://www.weworkoffice.in/404",
            "mainEntity": {
              "@type": "Organization",
              "name": "Alfa Business Center",
              "description": "Premium coworking space in Mumbai offering flexible workspace solutions",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "postalCode": "400092",
                "addressCountry": "IN"
              },
              "telephone": "+91-98201-90836",
              "email": "info@alfaesol.com"
            }
          })
        }}
      />
    </div>
  );
}