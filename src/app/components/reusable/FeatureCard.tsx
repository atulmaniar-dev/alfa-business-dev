'use client';

import Image from 'next/image';

type Feature = {
  image: string;
  title: string;
  desc: string;
};

export default function FeatureCard({ image, title, desc }: Feature) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out overflow-hidden">
      <div className="w-full h-48 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
        />
      </div>
      <div className="p-5 text-left">
        <h3 className="text-xl font-semibold text-[#2d386a] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
