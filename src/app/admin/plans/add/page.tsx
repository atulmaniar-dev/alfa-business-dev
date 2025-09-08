'use client';

import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { planSchema } from '@/app/lib/schemas/planSchema';

type FormState = {
  title: string;
  monthlyPrice: string;
  yearlyPrice: string;
  available: boolean;
  description: string;
  popular: boolean;
  monthlyFeatureInput: string;
  yearlyFeatureInput: string;
};

type SimpleInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
};

type TextareaInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
};

type SelectInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
};

type FeatureTagInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  tags: string[];
  onRemove: (tag: string) => void;
  onAdd: () => void;
  error?: string;
};

export default function AddEditPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('id');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLLabelElement | null>(null);

  const [form, setForm] = useState<FormState>({
    title: '',
    monthlyPrice: '',
    yearlyPrice: '',
    available: false,
    description: '',
    popular: false,
    monthlyFeatureInput: '',
    yearlyFeatureInput: '',
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [monthlyFeatureTags, setMonthlyFeatureTags] = useState<string[]>([]);
  const [yearlyFeatureTags, setYearlyFeatureTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (planId) {
      (async () => {
        try {
          const res = await fetch(`/api/plans/${planId}`);
          if (!res.ok) throw new Error('Failed to fetch plan');

          const plan = await res.json();
          setForm({
            title: plan.title,
            monthlyPrice: String(plan.monthlyPrice),
            yearlyPrice: String(plan.yearlyPrice),
            available: plan.available,
            popular: plan.popular,
            description: plan.description,
            monthlyFeatureInput: '',
            yearlyFeatureInput: '',
          });
          setMonthlyFeatureTags(plan.monthlyFeatures || []);
          setYearlyFeatureTags(plan.yearlyFeatures || []);
        } catch (err) {
          console.error(err);
          toast.error('Failed to load plan for editing');
        }
      })();
    }
  }, [planId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFeatureInput = (
    key: 'monthlyFeatureInput' | 'yearlyFeatureInput',
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    existingTags: string[],
  ) => {
    const val = form[key].trim();
    if (val && !existingTags.includes(val)) {
      setTags(prev => [...prev, val]);
      setForm(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    key: 'monthlyFeatureInput' | 'yearlyFeatureInput',
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    existingTags: string[],
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFeatureInput(key, setTags, existingTags);
    }
  };

  const removeTag = (tag: string, setTags: React.Dispatch<React.SetStateAction<string[]>>) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - imageFiles.length);
      setImageFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageChange(e.dataTransfer.files);
  };

  const handleFileClick = () => inputRef.current?.click();

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsed = planSchema.safeParse({
      ...form,
      monthlyPrice: Number(form.monthlyPrice),
      yearlyPrice: Number(form.yearlyPrice),
      monthlyFeatures: monthlyFeatureTags,
      yearlyFeatures: yearlyFeatureTags,
      images: imageFiles.map(() => 'https://placeholder.com/image.jpg'),
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        if (err.path && err.path.length > 0) {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      await Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fix the highlighted fields before submitting.',
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('monthlyPrice', form.monthlyPrice);
    formData.append('yearlyPrice', form.yearlyPrice);
    formData.append('available', String(form.available));
    formData.append('popular', String(form.popular));
    formData.append('description', form.description);
    formData.append('monthlyFeatures', JSON.stringify(monthlyFeatureTags));
    formData.append('yearlyFeatures', JSON.stringify(yearlyFeatureTags));
    imageFiles.forEach(file => formData.append('images', file));

    try {
      const res = await fetch(planId ? `/api/plans/${planId}` : '/api/plans', {
        method: planId ? 'PATCH' : 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Something went wrong');

      await Swal.fire({
        icon: 'success',
        title: `Plan ${planId ? 'updated' : 'created'} successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/admin/plans');
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: 'error',
        title: 'Error saving plan',
        text: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#2d386a]">
          {planId ? 'Edit Pricing Plan' : 'Add Pricing Plan'}
        </h1>
        <button onClick={() => router.back()} className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SimpleInput
            label="Plan Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={errors.title}
          />

          <SimpleInput
            label="Monthly Price"
            name="monthlyPrice"
            type="number"
            value={form.monthlyPrice}
            onChange={handleChange}
            error={errors.monthlyPrice}
          />

          <SimpleInput
            label="Yearly Price"
            name="yearlyPrice"
            type="number"
            value={form.yearlyPrice}
            onChange={handleChange}
            error={errors.yearlyPrice}
          />

          <SelectInput
            label="Popular"
            name="popular"
            value={form.popular ? 'yes' : 'no'}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setForm(prev => ({ ...prev, popular: e.target.value === 'yes' }))
            }
            error={errors.popular}
          />

          <SelectInput
            label="Available"
            name="available"
            value={form.available ? 'yes' : 'no'}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setForm(prev => ({ ...prev, available: e.target.value === 'yes' }))
            }
            error={errors.available}
          />

        </div>

        <TextareaInput
          label="Short Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
        />
        <FeatureTagInput
          label="Monthly Features"
          name="monthlyFeatureInput"
          value={form.monthlyFeatureInput}
          onChange={handleChange}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, 'monthlyFeatureInput', setMonthlyFeatureTags, monthlyFeatureTags)
          }
          onAdd={() => handleFeatureInput('monthlyFeatureInput', setMonthlyFeatureTags, monthlyFeatureTags)}
          onRemove={(tag: string) => removeTag(tag, setMonthlyFeatureTags)}
          tags={monthlyFeatureTags}
          error={errors.monthlyFeatures}
        />

        <FeatureTagInput
          label="Yearly Features"
          name="yearlyFeatureInput"
          value={form.yearlyFeatureInput}
          onChange={handleChange}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, 'yearlyFeatureInput', setYearlyFeatureTags, yearlyFeatureTags)
          }
          onAdd={() => handleFeatureInput('yearlyFeatureInput', setYearlyFeatureTags, yearlyFeatureTags)}
          onRemove={(tag: string) => removeTag(tag, setYearlyFeatureTags)}
          tags={yearlyFeatureTags}
          error={errors.yearlyFeatures}
        />
        <div className="space-y-4">
          <label
            ref={dropRef}
            onClick={handleFileClick}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`block w-full border-2 border-dashed rounded-md px-6 py-8 text-center transition-all duration-200 cursor-pointer ${isDragging ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files)}
            />
            <p className="text-sm text-gray-600">
              {isDragging ? (
                <span className="text-blue-600 font-medium">Drop images here</span>
              ) : (
                <>Click or drag & drop to upload images (max 5)</>
              )}
            </p>
          </label>

          {imageFiles.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {imageFiles.map((file, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-md border border-gray-300 shadow-sm overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-white text-red-500 border border-gray-300 rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
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
            className={`px-6 py-2 flex items-center justify-center gap-2 rounded-md text-white transition-colors ${isSubmitting
              ? 'bg-[#2d386a] cursor-not-allowed opacity-75'
              : 'bg-[#2d386a] hover:bg-[#1f2950]'
              }`}
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? (planId ? 'Updating...' : 'Saving...') : (planId ? 'Update Plan' : 'Save Plan')}
          </button>
        </div>

      </form>
    </div>
  );
}

// Components remain the same:
function SimpleInput({ label, name, value, onChange, type = 'text', error }: SimpleInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        id={name}
        value={value}
        type={type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#2d386a]'}`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}


function TextareaInput({ label, name, value, onChange, error }: TextareaInputProps) {

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        rows={3}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#2d386a]'}`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}


function SelectInput({ label, name, value, onChange, error }: SelectInputProps) {

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border ${error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#2d386a]'
          }`}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}


function FeatureTagInput({
  label,
  name,
  value,
  onChange,
  onKeyDown,
  tags,
  onRemove,
  onAdd,
  error,
}: FeatureTagInputProps) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className={`rounded-lg border bg-white p-4 shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
          {tags.length > 0 ? tags.map((tag: string) => (
            <span key={tag} className="bg-[#2d386a]/10 text-[#2d386a] text-sm px-3 py-1 rounded-full flex items-center gap-2">
              {tag}
              <button type="button" onClick={() => onRemove(tag)} className="text-xs text-red-500 hover:text-red-700 font-bold">×</button>
            </span>
          )) : <p className="text-sm text-gray-400 italic">No features added</p>}
        </div>
        <div className="flex items-center gap-2">
          <input
            name={name}
            placeholder="Type feature and press Enter"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            onKeyDown={onKeyDown}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2d386a] transition"
          />
          <button
            type="button"
            onClick={onAdd}
            className="text-sm bg-[#2d386a] hover:bg-[#1e2a4d] text-white px-4 py-2 rounded-md transition"
          >
            Add
          </button>
        </div>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
}

