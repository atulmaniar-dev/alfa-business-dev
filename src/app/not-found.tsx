'use client';
import React from 'react';
import Link from 'next/link';
import { Home, Mail } from 'lucide-react'; // Lucide icons

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 py-10 text-center">
      
      {/* Illustration */}
      <img
        src="/lost-image.png"
        alt="Page Not Found Illustration"
        className="w-70 h-auto mb-6"
      />

      {/* Heading */}
      <h1 className="text-3xl md:text-6xl font-bold text-[#2d386a] mb-3">
        Oops! You&apos;re a little lost.
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-6 text-sm md:text-base">
        The page you&apos;re trying to access doesn&apos;t exist. It might have been removed,
        renamed, or never existed in the first place.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#2d386a] hover:bg-[#1f2a4e] text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <Home size={18} /> Back to Home
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <Mail size={18} /> Contact Support
        </Link>
      </div>
    </div>
  );
}
