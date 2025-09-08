'use client';

import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
  slug: string;
  image?: string;
  title: string;
  price: string;
  duration: string;
  features?: string[]; // Make features optional
  highlight?: string;
}

export default function PlanCard({
  slug,
  image,
  title,
  price,
  duration,
  features = [], // Default to empty array to avoid slice error
}: PlanCardProps) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll ? features : features.slice(0, 3);
  const hasMore = features.length > 3;

  return (
    <div className="w-[400px] max-w-full transition duration-300 border hover:shadow-lg border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          No Image Available
        </div>
      )}

      <div className="p-5 flex flex-col gap-y-4 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          <div className="text-2xl font-bold text-[#2d386a] mb-3">
            {price}
            <span className="text-sm font-normal text-gray-500"> {duration}</span>
          </div>

          <ul className="space-y-1 text-sm text-gray-700">
            {visibleFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="text-green-500 w-4 h-4 mt-1" />
                <span className="line-clamp-2">{feature}</span>
              </li>
            ))}
          </ul>

          {hasMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAll(!showAll);
              }}
              className="mt-2 inline-flex items-center gap-1 text-sm text-[#1e2952] font-semibold hover:text-[#0e1535] transition"
            >
              {showAll ? 'Hide extra features' : 'Show all features'}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/plans/${slug}`);
          }}
          className="mt-auto border cursor-pointer border-[#1e2952] text-[#1e2952] font-medium py-2 rounded-md hover:bg-[#1e2952] hover:text-white transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
