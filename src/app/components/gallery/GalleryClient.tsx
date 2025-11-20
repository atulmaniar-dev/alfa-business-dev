"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Gallery = {
  imageType: string;
  images: string[];
};

type GalleryClientProps = {
  initialGalleryData: Gallery[];
  categories: string[];
};

export default function GalleryClient({ initialGalleryData, categories }: GalleryClientProps) {
  const [selected, setSelected] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine all gallery images into a flat array with their category
  const allImages = initialGalleryData.flatMap((item) =>
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

  // Get alt text for images based on category
  const getAltText = (category: string, index: number) => {
    const baseTexts = {
      "Workspaces": "Premium coworking workspace with modern furniture and natural lighting at Alfa Business Center Borivali Mumbai",
      "Meeting Rooms": "Professional meeting room equipped with conference facilities at Alfa Business Center Borivali West",
      "Amenities": "Modern amenities and facilities including high-speed internet and lounge areas at Alfa Business Center Mumbai",
      "Lounge": "Comfortable lounge area for relaxation and networking at Alfa Business Center Borivali coworking space",
      "Common Areas": "Spacious common areas and collaborative spaces at Alfa Business Center Borivali Mumbai"
    };
    
    return baseTexts[category as keyof typeof baseTexts] || 
           `Gallery image ${index + 1} showcasing ${category.toLowerCase()} at Alfa Business Center coworking space Borivali Mumbai`;
  };

  return (
    <>
      {/* Category Tabs */}
      <nav 
        className="flex flex-wrap justify-center gap-2 mb-10"
        aria-label="Gallery categories"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-5 py-2 rounded-full border cursor-pointer text-sm font-medium transition ${
              selected === cat
                ? "bg-[#2d386a] text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            aria-pressed={selected === cat}
            aria-label={`Show ${cat.toLowerCase()} images`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Interactive Gallery Grid */}
      {filteredImages.length === 0 ? (
        <p className="text-gray-500 text-lg">No images available in this category</p>
      ) : (
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {filteredImages.map((item, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={(index + 1).toString()} />
              <div itemProp="item" itemScope itemType="https://schema.org/ImageObject">
                <Image
                  src={item.url}
                  alt={getAltText(item.category, index)}
                  width={400}
                  height={250}
                  className="w-full h-[250px] object-cover"
                  itemProp="contentUrl"
                  priority={index < 8} // Prioritize first 8 images for better loading
                />
                <meta itemProp="name" content={`${item.category} - Alfa Business Center Borivali`} />
                <meta itemProp="description" content={getAltText(item.category, index)} />
                <meta itemProp="acquireLicensePage" content="https://weworkoffice.in/gallery" />
                <meta itemProp="license" content="https://weworkoffice.in/terms" />
                <meta itemProp="copyrightNotice" content="Alfa Business Center" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Viewer */}
      {showModal && filteredImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4"
          role="dialog"
          aria-label="Image gallery viewer"
          aria-modal="true"
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 cursor-pointer right-4 text-white hover:text-gray-300"
            aria-label="Close image viewer"
          >
            <X size={28} />
          </button>

          <div className="flex items-center justify-between w-full max-w-5xl relative">
            <button
              onClick={handlePrev}
              className="p-2 text-white cursor-pointer hover:text-gray-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="flex flex-col items-center max-w-3xl w-full">
              <Image
                src={filteredImages[currentIndex].url}
                alt={`Zoomed view: ${getAltText(filteredImages[currentIndex].category, currentIndex)}`}
                width={1000}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-white mt-2 text-sm">
                Image {currentIndex + 1} of {filteredImages.length} - {filteredImages[currentIndex].category}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="p-2 text-white cursor-pointer hover:text-gray-300"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}