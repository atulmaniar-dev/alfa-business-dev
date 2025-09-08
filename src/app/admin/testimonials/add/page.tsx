'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2';

export default function AddTestimonial() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
    image: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'image' && files?.[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageDelete = () => {
    setForm((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

   try {
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('title', form.title);
  formData.append('email', form.email);
  formData.append('message', form.message);
  if (form.image) formData.append('image', form.image);

  const res = await fetch('/api/testimonials', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  setIsSubmitting(false);

  if (!res.ok) throw new Error(data.error || 'Submission failed');

  await Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: 'Testimonial submitted successfully!',
  });

  router.push('/admin/testimonials');
} catch (err) {
  console.error('Error:', err);
  setIsSubmitting(false);

  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: 'Something went wrong. Please try again.',
  });
}

  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#2d386a]">Add Testimonial</h1>
        <button
          onClick={() => router.back()}
          className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
        <SimpleInput label="Name" name="name" value={form.name} onChange={handleChange} />
        <SimpleInput label="Title" name="title" value={form.title} onChange={handleChange} />
        <SimpleInput label="Email" name="email" value={form.email} onChange={handleChange} />
        <SimpleInput label="Message" name="message" value={form.message} onChange={handleChange} isTextArea />

        {/* Drag-drop image upload */}
        <div className="space-y-4">
          <label
            className={`block w-full border-2 border-dashed rounded-md px-6 py-8 text-center cursor-pointer transition-all ${
              form.image ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="image"
              className="hidden"
              onChange={handleChange}
            />
            <p className="text-sm text-gray-600">
              {form.image ? (
                <span className="text-blue-600 font-medium">Image selected</span>
              ) : (
                <>Click or drag & drop to upload an image</>
              )}
            </p>
          </label>

          {form.image && (
            <div className="relative w-32 h-32 border rounded-md shadow-sm overflow-hidden">
              <img
                src={URL.createObjectURL(form.image)}
                alt="Image Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleImageDelete}
                className="absolute top-1 right-1 bg-white text-red-500 border border-gray-300 rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 flex items-center justify-center gap-2 rounded-md text-white transition-colors ${
              isSubmitting ? 'bg-[#2d386a] opacity-75 cursor-not-allowed' : 'bg-[#2d386a] hover:bg-[#1f2950]'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable input component
function SimpleInput({
  label,
  name,
  value,
  onChange,
  isTextArea = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
          rows={4}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#2d386a]"
        />
      ) : (
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#2d386a]"
        />
      )}
    </div>
  );
}
