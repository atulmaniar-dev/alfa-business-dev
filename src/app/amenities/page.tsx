'use client';
import FeatureCard from "@/app/components/reusable/FeatureCard";
import BookTourCTA from "../components/reusable/BookTourCTA";
import { useEffect, useState } from "react";

type Amenity = {
  _id: string;
  amenitiesName: string;
  tag: string;
  description: string;
  image: string[];
};

export default function Amenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAmenities = async () => {
    try {
      const res = await fetch('/api/amenities');
      if (!res.ok) throw new Error('Failed to fetch amenities');
      const data = await res.json();
      setAmenities(data);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  return (
    <section className="pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#1e2952]">
          Explore Our World-Class Amenities
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          At Alfa Business Center, we provide everything you need for a productive and comfortable work environment. Discover the extensive range of facilities designed to enhance your coworking experience.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading amenities...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities.map((item) => (
              <FeatureCard
                key={item._id}
                image={item.image?.[0] || '/placeholder.jpg'}
                title={item.amenitiesName}
                desc={item.description}
              />
            ))}
          </div>
        )}
      </div>

      <BookTourCTA />
    </section>
  );
}
