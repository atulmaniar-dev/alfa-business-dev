'use client';

import { useEffect, useState } from 'react';
import FeatureCard from '../reusable/FeatureCard';
import { toast } from 'sonner';

type Feature = {
  image: string;
  title: string;
  desc: string;
};

type AmenityAPIResponse = {
  image: string[];
  amenitiesName: string;
  description: string;
};

interface WhyChooseSectionProps {
  heading?: string;
  subheading?: string;
  maxVisible?: number;
}

export default function WhyChooseSection({
  heading = 'Why Choose Alfa Business Center?',
  subheading,
  maxVisible,
}: WhyChooseSectionProps) {
  const [amenities, setAmenities] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch('/api/amenities');
        if (!res.ok) throw new Error('Failed to fetch amenities');

        const data: AmenityAPIResponse[] = await res.json();
        const formatted: Feature[] = data.map((item) => ({
          image: item.image?.[0] || '',
          title: item.amenitiesName,
          desc: item.description,
        }));

        setAmenities(formatted);
      } catch {
        toast.error('Failed to fetch amenities');
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  const visibleFeatures = maxVisible ? amenities.slice(0, maxVisible) : amenities;

  return (
    <section className="py-16">
      <div className="mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2d386a] mb-4">
          {heading}
        </h2>
        {subheading && (
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-base sm:text-lg">
            {subheading}
          </p>
        )}

        <div className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: maxVisible || 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="bg-gray-300 w-full h-40" />
                  <div className="p-4">
                    <div className="bg-gray-300 h-5 w-3/4 mb-2 rounded" />
                    <div className="bg-gray-200 h-4 w-full mb-1 rounded" />
                    <div className="bg-gray-200 h-4 w-5/6 rounded" />
                  </div>
                </div>
              ))
            : visibleFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out overflow-hidden"
                >
                  <div className="w-full h-48 relative overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-5 text-left">
                    <h3 className="text-xl font-semibold text-[#2d386a] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
