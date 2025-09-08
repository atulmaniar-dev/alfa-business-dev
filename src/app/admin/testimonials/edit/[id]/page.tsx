'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    message: '',
    image: '',
    status: 'pending',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/testimonials/${id}`)
        .then(async res => {
          if (!res.ok) throw new Error(await res.text());
          return res.json();
        })
        .then(data => {
          const testimonial = data.testimonial || data;
          setForm({
            name: testimonial.name || '',
            email: testimonial.email || '',
            message: testimonial.message || '',
            image: testimonial.image || '',
            status: testimonial.status || 'pending',
            title: testimonial.title || '',
          });
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to load testimonial');
          router.push('/admin/testimonials');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_id', String(id));
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('title', form.title);
    formData.append('message', form.message);
    formData.append('status', form.status);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Update failed');
      }

      toast.success('Testimonial updated');
      router.push('/admin/testimonials');
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Something went wrong');
    }
  };

  if (loading) return <p className="text-gray-500 px-4">Loading testimonial...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Testimonial</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-6"
      >
        <SimpleInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <SimpleInput
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <SimpleInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <SimpleInput
          label="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          textarea
        />

        {/* Image Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded-md text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
          />
          {form.image && !imageFile && (
            <img
              src={form.image}
              alt="Uploaded"
              className="w-24 h-24 rounded object-cover mt-2 border"
            />
          )}
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-[#2d386a] text-white rounded hover:bg-[#1f2950] transition"
          >
            Update Testimonial
          </button>
        </div>
      </form>
    </div>
  );
}

// ✅ Reusable Input (SimpleInput)
function SimpleInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  textarea = false,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  textarea?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          rows={4}
          className="w-full border px-4 py-2 rounded-md text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full border px-4 py-2 rounded-md text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
        />
      )}
    </div>
  );
}
