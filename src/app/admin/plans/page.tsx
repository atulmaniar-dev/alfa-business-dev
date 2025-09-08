"use client";

import { useEffect, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ActionMenu from '../components/ui/ActionMenu';
import Swal from 'sweetalert2';

export type Plan = {
  _id: string;
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyFeatures: string[];
  yearlyFeatures: string[];
  images: string[];
  description: string;
  popular: boolean;
  available: boolean;
  slug: string;
};

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function ProductPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/plans');
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.log(err)
      toast.error("Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  const handleNewPlan = () => {
    router.push("/admin/plans/add");
  };

const handleDelete = async (slug: string, title: string) => {
  const result = await Swal.fire({
    title: `Delete "${title}"?`,
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result.isConfirmed) return;

  try {
    setDeletingId(slug);
    const res = await fetch(`/api/plans/${slug}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok) {
      await Swal.fire('Deleted!', `"${title}" has been deleted.`, 'success');
      fetchPlans();
    } else {
      Swal.fire('Error', data.error || 'Delete failed', 'error');
    }
  } catch (err) {
    console.log(err)
    Swal.fire('Error', 'Delete request failed', 'error');
  } finally {
    setDeletingId(null);
  }
};


  const renderCompactList = (items: string[] = []) => {
    if (!items.length) return <span className="text-gray-400">-</span>;
    const short = items.slice(0, 3).join(', ');
    const extra = items.length > 3 ? `...+${items.length - 3}` : '';
    return (
      <div className="text-xs text-gray-700 max-w-[160px] truncate" title={items.join(', ')}>
        {short} {extra}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pricing Plans Overview</h1>
        <p className="mt-1 text-gray-600 text-sm">
          Manage your coworking space&apos;s pricing strategies. Add, update or delete plans easily.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Pricing Plans</h2>
        <Button onClick={handleNewPlan} className="bg-[#2d386a] text-white hover:bg-[#1f2950]">
          <CiCirclePlus className="mr-2 text-lg" /> Add New Plan
        </Button>
      </div>

      <div className="overflow-auto max-w-full max-h-[500px] border rounded-lg scrollbar-hide">
        <table className="min-w-[1000px] w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-600 uppercase sticky top-0 z-10">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Monthly Price</th>
              <th className="p-3">Yearly Price</th>
              <th className="p-3">Monthly Features</th>
              <th className="p-3">Yearly Features</th>
              <th className="p-3 text-center">Popular</th>
              <th className="p-3 text-center">Available</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-t">
                  {[...Array(9)].map((_, j) => (
                    <td key={j} className="p-3">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              plans.map((plan) => (
                <tr key={plan._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <Image
                      src={plan.images?.[0] || '/images/default.jpg'}
                      alt={`Image for ${plan.title}`}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3 max-w-[160px] truncate" title={plan.title}>{plan.title}</td>
                  <td className="p-3 text-blue-600 font-medium">₹{Number(plan.monthlyPrice || 0).toLocaleString()}</td>
                  <td className="p-3 text-blue-600 font-medium">₹{Number(plan.yearlyPrice || 0).toLocaleString()}</td>
                  <td className="p-3">{renderCompactList(plan.monthlyFeatures)}</td>
                  <td className="p-3">{renderCompactList(plan.yearlyFeatures)}</td>
                  <td className="p-3 text-center">{plan.popular ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-center text-green-600 font-semibold">{plan.available ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-center">
                    <ActionMenu
                      onEdit={() => router.push(`/admin/plans/edit/${plan.slug}`)}
                      onDelete={async () => await handleDelete(plan.slug, plan.title)}
                      disabled={deletingId === plan.slug}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
