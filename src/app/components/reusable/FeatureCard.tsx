'use client';

import Image from 'next/image';

type Feature = {
  image: string;
  title: string;
  desc: string;
};

export default function FeatureCard({ image, title, desc }: Feature) {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out overflow-hidden"
      itemScope
      itemType="https://schema.org/LocationFeatureSpecification"
      aria-label={`Amenity: ${title} at Alfa Business Center Borivali Mumbai`}
    >
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={desc} />
      
      <div className="w-full h-48 relative overflow-hidden">
        <Image
          src={image}
          alt={`${title} amenity at Alfa Business Center Coworking Space Borivali Mumbai`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
          itemProp="image"
        />
      </div>
      <div className="p-5 text-left">
        <h3 
          className="text-xl font-semibold text-[#2d386a] mb-2"
          itemProp="alternateName"
        >
          {title}
        </h3>
        <p 
          className="text-gray-600 text-sm leading-relaxed"
          itemProp="featureDescription"
        >
          {desc}
        </p>
      </div>
      
      {/* Hidden structured data for individual amenity */}
      <div className="sr-only">
        <div itemScope itemType="https://schema.org/Service">
          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={desc} />
          <meta itemProp="provider" content="Alfa Business Center" />
          <meta itemProp="areaServed" content="Borivali Mumbai" />
          <meta itemProp="availableAtOrFrom" content="Alfa Business Center Borivali" />
        </div>
      </div>
    </div>
  );
}