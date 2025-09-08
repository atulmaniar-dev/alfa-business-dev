'use client';

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';

interface FormDataState {
  amenitiesName: string;
  tag: string;
  description: string;
  imageUrl: string;
}

interface SimpleInputProps {
  label: string;
  name: keyof FormDataState;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditAmenity() {
  const router = useRouter();
  const { id } = useParams(); // ✅ use 'id' instead of 'slug'
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [initialImageUrl, setInitialImageUrl] = useState('');

  const [form, setForm] = useState<FormDataState>({
    amenitiesName: '',
    tag: '',
    description: '',
    imageUrl: '',
  });

  // ✅ Load existing amenity using id
  useEffect(() => {
    const fetchAmenity = async () => {
      try {
        const res = await fetch(`/api/amenities/${id}`);
        const data = await res.json();
        setForm({
          amenitiesName: data.amenitiesName || '',
          tag: data.tag || '',
          description: data.description || '',
          imageUrl: data.image?.[0] || '',
        });
        setInitialImageUrl(data.image?.[0] || '');
      } catch (err) {
        console.error('Failed to fetch amenity:', err);
      }
    };

    if (id) fetchAmenity();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'imageUrl' && files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setForm(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('amenitiesName', form.amenitiesName);
    formData.append('tag', form.tag);
    formData.append('description', form.description);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch(`/api/amenities/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update amenity.');

      await Swal.fire({
        icon: 'success',
        title: 'Amenity Updated!',
        text: 'Changes saved successfully.',
        confirmButtonColor: '#2d386a',
      });

      router.push('/admin/amenities');
    } catch (err: unknown) {
      const error = err as Error;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#2d386a]">Edit Amenity</h1>
        <button
          onClick={() => router.back()}
          className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
        <SimpleInput label="Amenity Name" name="amenitiesName" value={form.amenitiesName} onChange={handleChange} />
        <SimpleInput label="Tag (e.g. Gym, Wi-Fi)" name="tag" value={form.tag} onChange={handleChange} />
        <SimpleInput label="Description" name="description" value={form.description} onChange={handleChange} />

        <div className="space-y-4">
          <label
            className={`block w-full border-2 border-dashed rounded-md px-6 py-8 text-center transition-all duration-200 cursor-pointer ${
              imageFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="imageUrl"
              className="hidden"
              onChange={handleChange}
            />
            <p className="text-sm text-gray-600">
              {imageFile ? (
                <span className="text-blue-600 font-medium">New image selected</span>
              ) : (
                <>Click or drag & drop to upload a new image</>
              )}
            </p>
          </label>

          {form.imageUrl && (
            <div className="relative w-32 h-32 border rounded-md shadow-sm overflow-hidden">
              <Image
                src={form.imageUrl}
                alt="Preview"
                fill
                style={{ objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setForm(prev => ({ ...prev, imageUrl: initialImageUrl }));
                }}
                className="absolute top-1 right-1 bg-white text-red-500 border border-gray-300 rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="reset"
            onClick={() => router.refresh()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 flex items-center justify-center gap-2 rounded-md text-white transition-colors ${
              isSubmitting
                ? 'bg-[#2d386a] cursor-not-allowed opacity-75'
                : 'bg-[#2d386a] hover:bg-[#1f2950]'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Amenity'}
          </button>
        </div>
      </form>
    </div>
  );
}

function SimpleInput({ label, name, value, onChange }: SimpleInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#2d386a]"
      />
    </div>
  );
}
