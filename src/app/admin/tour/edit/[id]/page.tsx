'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function EditTour() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    number: '',
    preferredDate: '',
    preferredTime: '',
    status: 'pending',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/book-tour/${id}`);
        if (!res.ok) throw new Error('Failed to fetch booking');
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error('Error fetching booking:', error);
        alert('Failed to load booking details');
      }
    };

    if (id) fetchBooking();
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`/api/book-tour/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const text = await res.text();
    const result = text ? JSON.parse(text) : {};
    console.log(result);
    // ✅ Show success alert
    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Booking updated successfully!',
      confirmButtonColor: '#2d386a',
    });

    router.push('/admin/tour');
  } catch (error: unknown) {
    console.error('Update error:', error);

    //  Show error alert
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: (error as Error).message || 'Error occurred while updating',
      confirmButtonColor: '#d33',
    });
  } finally {
    setLoading(false);
  }
};



  // 👇 same form rendering as before
  const fields = [
    { name: 'fullName', label: 'Client Name' },
    { name: 'email', label: 'Email Address' },
    { name: 'number', label: 'Phone Number' },
    { name: 'preferredDate', label: 'Tour Date' },
    { name: 'preferredTime', label: 'Tour Time' },
    { name: 'status', label: 'Status' },
    { name: 'message', label: 'Message (optional)' },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto mt-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-[#2d386a] mb-6 border-b pb-2">Edit Tour Request</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {fields.map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
              {label}
            </label>

            {name === 'status' ? (
              <select
                id={name}
                className="p-2 border border-gray-300 rounded"
                value={form.status}
                onChange={(e) => handleChange(name, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            ) : name === 'message' ? (
              <textarea
                id={name}
                className="p-2 border border-gray-300 rounded"
                value={form.message}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            ) : (
              <input
                id={name}
                type={name === 'preferredDate' ? 'date' : name === 'preferredTime' ? 'time' : 'text'}
                className="p-2 border border-gray-300 rounded"
                value={form[name as keyof typeof form] || ''}
                onChange={(e) => handleChange(name, e.target.value)}
                required={name !== 'message'}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#2d386a] text-white rounded hover:bg-[#1f2a4d]"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Booking'}
        </button>
      </form>
    </div>
  );
}
