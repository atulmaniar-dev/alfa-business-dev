'use client';
import { useRouter } from 'next/navigation';

export default function BookTourCTA() {
  const router = useRouter();

  return (
    <section className="bg-gray-100 py-16 pt-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Ready to Experience Alfa Business Center?
        </h2>
        <p className="text-base sm:text-lg text-gray-800 mb-8">
          Join our thriving community and take your productivity to the next level.
          Book a tour today to see our facilities firsthand and discuss your coworking needs.
        </p>
        <button
          onClick={() => router.push('/tour')}
          className="bg-black cursor-pointer text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Book a Tour Now
        </button>
      </div>
    </section>
  );
}
