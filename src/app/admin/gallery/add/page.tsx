'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
  import Swal from 'sweetalert2';

const imageTypeOptions = ["Workspaces", "Meeting Rooms", "Amenities", "Lounge", "Common Areas"];

export default function AddGalleryPage() {
  const [imageType, setImageType] = useState("Workspaces");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("folder", imageType); // now using selected folder

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) uploadedUrls.push(data.url);
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);
    setIsUploading(false);
  };


const handleSubmit = async () => {
  if (imageUrls.length === 0) {
    return Swal.fire({
      icon: 'warning',
      title: 'No Images',
      text: 'Please upload at least one image before submitting.',
      confirmButtonColor: '#2d386a',
    });
  }

  const res = await fetch("/api/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageType,
      images: imageUrls,
    }),
  });

  const result = await res.json();

  if (res.ok) {
    await Swal.fire({
      icon: 'success',
      title: 'Gallery Saved!',
      text: 'Your images were successfully added to the gallery.',
      confirmButtonColor: '#2d386a',
    });
    router.push('/admin/gallery');
    setImageUrls([]);
    
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: result.error || 'An error occurred while saving the gallery.',
      confirmButtonColor: '#d33',
    });
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Gallery Images</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Type (Folder)</label>
        <select
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {imageTypeOptions.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block border p-2 rounded w-full"
      />

      {isUploading && <p className="text-blue-500 mb-4">Uploading...</p>}

      <div className="flex flex-wrap gap-3 mb-4">
        {imageUrls.map((url, i) => (
          <img key={i} src={url} className="h-24 rounded border" alt={`Preview ${i}`} />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save to DB
      </button>
    </div>
  );
}
