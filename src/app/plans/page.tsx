'use client';
import React, { useEffect, useState } from 'react';
import PlanCard from '@/app/components/reusable/PlanCard';
import FaqSection from '../components/reusable/FaqSection';
import { PlanType } from '@/app/types/plan';
import PlanSkeleton from '@/app/components/reusable/PlanSkeleton';

export default function AllPlansPage() {
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState<number>(4); // default fallback

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        const data = await res.json();
        setPlans(data);
        setSkeletonCount(data.length || 4); // set based on actual plans or fallback to 3
      } catch (error) {
        console.error('Error fetching plans:', error);
        setSkeletonCount(3); // fallback even on error
      }
    };

    fetchPlans();
  }, []);

  // Move loading = false to a separate effect so that skeletonCount is updated first
  useEffect(() => {
    if (plans.length > 0 || skeletonCount !== 4) {
      setLoading(false);
    }
  }, [plans, skeletonCount]);

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }, (_, i) => <PlanSkeleton key={i} />);

  return (
    <section className="bg-gradient-to-b from-[#f5f7fa] to-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#1e2952]">
          Flexible Plans for Every Workspace Need
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Choose a workspace plan that fits your goals — from daily hot desks to
          fully equipped private offices. Enjoy all modern amenities, high-speed internet,
          meeting credits, and a productive environment.
        </p>

        {loading ? (
          <>
            <div className="block sm:hidden mb-12">
              <div className="flex flex-col gap-6">
                {renderSkeletons(skeletonCount)}
              </div>
            </div>
            <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {renderSkeletons(skeletonCount)}
            </div>
          </>
        ) : plans.length === 0 ? (
          <p className="text-red-500">No plans found.</p>
        ) : (
          <>
            {/* Mobile */}
            <div className="block sm:hidden mb-12">
              <div className="flex flex-col gap-6">
                {plans.map((plan, index) => (
                  <div key={index} className="w-full max-w-sm mx-auto">
                    <PlanCard
                      slug={plan.slug || ''}
                      image={plan.images?.[0] || '/default.jpg'}
                      title={plan.title}
                      price={`₹${Number(plan.monthlyPrice).toLocaleString('en-IN')}`}
                      duration="/ Month"
                      features={plan.monthlyFeatures}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {plans.map((plan, index) => (
                <div key={index} className="flex justify-center">
                  <PlanCard
                    slug={plan.slug || ''}
                    image={plan.images?.[0] || '/default.jpg'}
                    title={plan.title}
                    price={`₹${Number(plan.monthlyPrice).toLocaleString('en-IN')}`}
                    duration="/ Month"
                    features={plan.monthlyFeatures}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-[#1e2952] mb-3">
            Not sure which plan is right for you?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact our workspace advisor to help you find the best match.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#1e2952] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#10172f] transition"
          >
            Talk to Us
          </a>
        </div>

        <FaqSection />
      </div>
    </section>
  );
}
