'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PlanDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Skeleton width={60} height={16} />
        <Skeleton width={14} height={14} circle />
        <Skeleton width={60} height={16} />
        <Skeleton width={14} height={14} circle />
        <Skeleton width={100} height={16} />
      </div>

      {/* Title & Availability */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Skeleton width={300} height={40} />
        <Skeleton width={140} height={30} borderRadius={999} />
      </div>

      {/* Main Image */}
      <div className="relative">
        <div className="mb-4">
          <Skeleton height={400} borderRadius={12} />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 flex-wrap justify-center">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} width={80} height={60} borderRadius={8} />
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <Skeleton width={150} height={28} />
        <Skeleton width={250} height={22} />
        <Skeleton width="100%" height={60} />
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton width="60%" height={20} />
            <Skeleton count={2} />
          </div>
        ))}
      </div>
    </div>
  );
}
