'use client';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Plan } from '@/app/types/plan';

function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PlanPricing({ plan }: { plan: Plan }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">
      {/* Monthly Plan */}
      <div className="border rounded-2xl p-6 shadow-md bg-white hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-[#1e2952] mb-2">Monthly Plan</h2>
        <div className="text-3xl font-bold text-[#2d386a] mb-1">
          {formatINR(plan?.monthlyPrice)}
        </div>
        <p className="text-sm text-gray-500 mb-4">Billed per Month</p>

        <ul className="space-y-2 text-sm text-gray-700">
          {(plan?.monthlyFeatures ?? plan?.features)?.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        <Link href="/payment">
          <button className="mt-6 cursor-pointer w-full bg-[#1e2952] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0e1535] transition">
            Reserve Now
          </button>
        </Link>
      </div>

      {/* Yearly Plan */}
      <div className="border rounded-2xl p-6 shadow-md bg-white hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-[#1e2952] mb-2">Yearly Plan</h2>
        <div className="text-3xl font-bold text-[#2d386a] mb-1">
          {formatINR(plan?.yearlyPrice)}
        </div>
        <p className="text-sm text-gray-500 mb-4">Billed per Year</p>

        <ul className="space-y-2 text-sm text-gray-700">
          {(plan?.yearlyFeatures ?? plan?.features)?.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        <Link href="/tour">
          <button className="mt-6 w-full cursor-pointer border-2 border-[#1e2952] text-[#1e2952] py-2.5 rounded-lg font-semibold hover:bg-[#1e2952] hover:text-white transition">
            Book a Tour
          </button>
        </Link>
      </div>
    </div>
  );
}
