'use client';

import PlanCard from '@/app/components/reusable/PlanCard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Plan = {
  slug: string;
  images: string;
  title: string;
  popular: boolean;
  monthlyPrice: number;
  monthlyFeatures: string[];
};

export default function PopularPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        if (!res.ok) throw new Error('Failed to fetch plans');
        const data = await res.json();
        console.log(data);
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error('Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const SkeletonCard = () => (
  <div className="w-[400px] max-w-full transition border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col">
    <div className="w-full h-40 bg-gray-300" />

    <div className="p-5 flex flex-col gap-y-4 flex-1">
      <div className="space-y-2">
        <div className="h-5 bg-gray-300 rounded w-1/2" /> {/* Title */}
        <div className="h-6 bg-gray-300 rounded w-1/3" /> {/* Price */}
      </div>

      <ul className="space-y-2">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex items-start gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full mt-1" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </li>
        ))}
      </ul>

      <div className="mt-auto h-10 bg-gray-300 rounded w-full" />
    </div>
  </div>
);


  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
         <h2 className="text-3xl sm:text-4xl font-bold text-[#2d386a] mb-4">
          Our Popular Plans
        </h2>
        
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-base sm:text-lg">
            Alfa working spaces create the best of both worlds for freelancers: The flexibility of choosing your own hours and schedule without the isolation.
          </p>
        

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.filter((plan) => plan.popular).map((plan) => (
              <PlanCard
                key={plan.slug}
                slug={plan.slug}
                image={plan.images[0]}
                title={plan.title}
                price={`₹${plan.monthlyPrice}`}
                duration="/ Month"
                features={plan.monthlyFeatures}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
