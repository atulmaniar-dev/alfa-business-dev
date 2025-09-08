'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiCirclePlus, CiTrash } from 'react-icons/ci';
 import Swal from 'sweetalert2';

type Gallery = {
  _id: string;
  imageType: string;
  images: string[];
  createdAt?: string;
};

export default function GalleryList() {
  const [galleryData, setGalleryData] = useState<Gallery[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data: Gallery[]) => {
        setGalleryData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  const predefinedTypes = ["Workspaces", "Meeting Rooms", "Amenities", "Lounge", "Common Areas"];
  const uniqueTypes = ['all', ...predefinedTypes];

  const filtered = galleryData.filter(g => selectedType === 'all' || g.imageType === selectedType);


const handleDelete = async (galleryId: string, imageUrl: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this image?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result.isConfirmed) return;

  const res = await fetch('/api/gallery', {
    method: 'PUT', // assuming PUT updates image array after deletion
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: galleryId, image: imageUrl }),
  });

  const data = await res.json();

  if (res.ok) {
    setGalleryData(prev =>
      prev.map(gallery =>
        gallery._id === galleryId
          ? { ...gallery, images: gallery.images.filter(img => img !== imageUrl) }
          : gallery
      )
    );

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The image has been deleted.',
      confirmButtonColor: '#2d386a',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Delete Failed',
      text: data.error || 'Something went wrong.',
      confirmButtonColor: '#d33',
    });
  }
};



  if (loading) return <p className="p-6">Loading gallery images...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Gallery Images</h2>
        <button
          onClick={() => router.push('/admin/gallery/add')}
          className="bg-[#2d386a] text-white hover:bg-[#1f2950] flex items-center px-4 py-2 rounded"
        >
          <CiCirclePlus className="mr-2 text-lg" />
          Add New Image
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {uniqueTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-1 rounded-full border ${
              selectedType === type
                ? 'bg-[#2d386a] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Image Grid or No Image Message */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No images available for this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((gallery) =>
            gallery.images.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Gallery Image ${index}`}
                  className="w-full h-32 object-cover rounded border"
                />
                <button
                  onClick={() => handleDelete(gallery._id, url)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  title="Delete Gallery"
                >
                  <CiTrash size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
