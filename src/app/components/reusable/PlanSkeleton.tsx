'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PlanCardSkeleton() {
  return (
    <div className="w-[400px] max-w-full border rounded-xl overflow-hidden bg-white flex flex-col shadow-sm">
      {/* Image Placeholder */}
      <div className="w-full h-45">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Content Placeholder */}
      <div className="p-5 flex flex-col gap-y-4 flex-1">
        {/* Title */}
        <Skeleton height={20} width="60%" />

        {/* Price */}
        <Skeleton height={28} width="40%" />

        {/* Features */}
        <div className="space-y-2">
          <Skeleton height={14} width="90%" />
          <Skeleton height={14} width="85%" />
          <Skeleton height={14} width="80%" />
        </div>

        {/* Button */}
        <div className="mt-auto">
          <Skeleton height={40} borderRadius={8} />
        </div>
      </div>
    </div>
  );
}
