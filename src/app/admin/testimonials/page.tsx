'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { HiOutlinePlus } from 'react-icons/hi';
import Swal from 'sweetalert2';

const statusColors: Record<'approved' | 'pending' | 'rejected', string> = {
  approved: 'text-green-600',
  pending: 'text-yellow-600',
  rejected: 'text-red-600',
};

type Testimonial = {
  _id: string;
  name: string;
  title: string;
  email: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  message: string;
  image: string;
};

export default function ClientTestimonials() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState('All');

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not load testimonials. Please try again later.',
      });
    }

  };
  useEffect(() => {

    fetchTestimonials();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/testimonials/edit/${id}`);
  };
  const handleDelete = async (id: string) => {
  const confirmed = await Swal.fire({
    title: 'Are you sure?',
    text: 'This testimonial will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!confirmed.isConfirmed) return;

  try {
    const res = await fetch(`/api/testimonials?id=${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire('Deleted!', data.message, 'success');
      // Refresh or update state here
    } else {
      Swal.fire('Error', data.error, 'error');
    }
  } catch (error) {
    console.error('Delete failed:', error);
    Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
  }
};



  const filteredTestimonials =
    filter === 'All'
      ? testimonials
      : testimonials.filter(
        (t) => t.status?.toLowerCase() === filter.toLowerCase()
      );

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Client Testimonials
        </h1>
        <button
          onClick={() => router.push('/admin/testimonials/add')}
          className="flex items-center bg-[#2d386a] text-white p-2 mx-2 rounded text-sm"
        >
          <HiOutlinePlus size={18} className="mx-2" /> Add Testimonial
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTestimonials.map((t) => (
          <div
            key={t._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={t.image || '/default-avatar.png'}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{t.name}</h2>
                <p className="text-sm text-gray-600">{t.title}</p>
                <span
                  className={`text-sm capitalize ${statusColors[t.status as keyof typeof statusColors]
                    }`}
                >
                  {t.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700">{t.message}</p>
            <div className="flex flex-wrap gap-2 mt-auto">

              <button
                onClick={() => handleEdit(t._id)}
                className="flex items-center px-3 py-1 text-sm rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                <FaEdit className="inline mr-1" /> Edit
              </button>
              <button
  onClick={() => handleDelete(t._id)}
  className="flex items-center px-3 py-1 text-sm rounded bg-red-100 text-red-800 hover:bg-red-200"
>
  <FaTimes className="inline mr-1" /> Delete
</button>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
