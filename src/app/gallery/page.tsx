"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Workspaces", "Meeting Rooms", "Amenities", "Lounge", "Common Areas"];

type Gallery = {
  imageType: string;
  images: string[];
};

export default function Gallery() {
  const [selected, setSelected] = useState("All");
  const [galleryData, setGalleryData] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch gallery data from API
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: Gallery[]) => {
        setGalleryData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Combine all gallery images into a flat array with their category
  const allImages = galleryData.flatMap((item) =>
    item.images.map((url) => ({
      url,
      category: item.imageType,
    }))
  );

  // Filter images by selected category
  const filteredImages = selected === "All"
    ? allImages
    : allImages.filter((img) => img.category === selected);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Explore Our Vibrant Spaces
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          Discover the dynamic and inspiring environments at Alfa Business Center,
          meticulously designed for productivity and collaboration.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-5 py-2 rounded-full border cursor-pointer text-sm font-medium transition ${
                selected === cat
                  ? "bg-[#2d386a] text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredImages.length === 0 ? (
          <p className="text-gray-500 text-lg">No images available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((item, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <Image
                  src={item.url}
                  alt={`Gallery ${index + 1}`}
                  width={400}
                  height={250}
                  className="w-full h-[250px] object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Viewer */}
      {showModal && filteredImages.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 cursor-pointer right-4 text-white hover:text-gray-300"
          >
            <X size={28} />
          </button>

          <div className="flex items-center justify-between w-full max-w-5xl relative">
            <button
              onClick={handlePrev}
              className="p-2 text-white cursor-pointer hover:text-gray-300"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="flex flex-col items-center max-w-3xl w-full">
              <Image
                src={filteredImages[currentIndex].url}
                alt="Preview"
                width={1000}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-white mt-2 text-sm">
                Image {currentIndex + 1} of {filteredImages.length}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="p-2 text-white cursor-pointer hover:text-gray-300"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
