'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import AddEditPlanForm from '@/app/admin/components/AddEditPlanForm';
import { Plan } from '@/app/types/plan';

export default function EditPlanPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchPlanData();
  }, [slug]);

  const fetchPlanData = async () => {
    try {
      const res = await fetch(`/api/plans/${slug}`);
      if (!res.ok) throw new Error('Plan not found');
      const data = await res.json();
      setPlan(data);
    } catch (error) {
      toast.error((error as Error).message || 'Failed to load plan');
      router.push('/admin/plans');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading plan...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Edit Plan</h1>
      {plan && (
        <AddEditPlanForm
          mode="edit"
          initialData={plan}
          onSuccess={() => {
            toast.success('Plan updated successfully');
            router.push('/admin/plans');
          }}
        />
      )}
    </div>
  );
}
