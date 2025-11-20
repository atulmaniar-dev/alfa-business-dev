'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Feature = {
  image: string;
  title: string;
  desc: string;
};

type AmenityAPIResponse = {
  image: string[];
  amenitiesName: string;
  description: string;
};

interface WhyChooseSectionProps {
  heading?: string;
  subheading?: string;
  maxVisible?: number;
}

export default function WhyChooseSection({
  heading = 'Why Choose Alfa Business Center in Borivali, Mumbai?',
  subheading,
  maxVisible,
}: WhyChooseSectionProps) {
  const [amenities, setAmenities] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmenity, setSelectedAmenity] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch('/api/amenities');
        if (!res.ok) throw new Error('Failed to fetch amenities');

        const data: AmenityAPIResponse[] = await res.json();
        const formatted: Feature[] = data.map((item) => ({
          image: item.image?.[0] || '',
          title: item.amenitiesName,
          desc: item.description,
        }));

        setAmenities(formatted);
      } catch {
        toast.error('Failed to fetch amenities');
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  const visibleFeatures = maxVisible ? amenities.slice(0, maxVisible) : amenities;

  const handleAmenityClick = (index: number) => {
    setSelectedAmenity(index);
  };

  const currentAmenity = amenities[selectedAmenity];

  // Function to format title with highlighted words - SEO Optimized
  const formatTitle = (title: string) => {
    if (!title) return (
      <>
        Premium <span className="bg-[#2d386a] text-white rounded-lg px-2 py-1 lg:px-2.5 lg:py-1 inline-block">Coworking Space</span> in Borivali Mumbai
      </>
    );
    
    const words = title.split(' ');
    if (words.length <= 2) {
      return (
        <>
          {words.slice(0, -1).join(' ')}{' '}
          <span className="bg-[#2d386a] text-white rounded-lg px-2 py-1 lg:px-2.5 lg:py-1 inline-block">
            {words[words.length - 1]}
          </span>
        </>
      );
    }

    // For longer titles, highlight the second word and last word
    return (
      <>
        {words[0]}{' '}
        <span className="bg-[#2d386a] text-white rounded-lg px-2 py-1 lg:px-2.5 lg:py-1 inline-block">
          {words[1]}
        </span>{' '}
        {words.slice(2, -1).join(' ')}
        {words.length > 3 && ' '}
        <span className="bg-[#2d386a] text-white rounded-lg px-2 py-1 lg:px-2.5 lg:py-1 inline-block">
          {words[words.length - 1]}
        </span>
      </>
    );
  };

  // Default SEO-optimized description
  const getOptimizedDescription = (desc: string) => {
    if (!desc) {
      return "Alfa Business Center in Borivali, Mumbai offers premium coworking spaces with modern amenities, high-speed internet, meeting rooms, and flexible workspace solutions perfect for startups, freelancers, and enterprises.";
    }
    return desc;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" 
             itemScope 
             itemType="https://schema.org/BusinessCenter"
             aria-label="Why Choose Alfa Business Center Coworking Space in Borivali Mumbai">
      
      {/* Structured Data for Business Center */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BusinessCenter",
            "name": "Alfa Business Center",
            "description": "Premium coworking space in Borivali, Mumbai offering modern amenities and flexible workspace solutions",
            "url": "https://weworkoffice.in",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "400092",
              "addressCountry": "IN"
            },
            "amenityFeature": visibleFeatures.slice(0, 4).map((feature, index) => ({
              "@type": "LocationFeatureSpecification",
              "name": feature.title,
              "description": feature.desc
            }))
          })
        }}
      />

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left side: Image with rounded corners - 1/3 width and full height */}
        <div className="relative w-full lg:w-1/3 max-w-md h-72 sm:h-80 lg:h-[480px] xl:h-[520px]">
          <div className="rounded-tl-[80px] rounded-br-[80px] lg:rounded-tl-[100px] lg:rounded-br-[100px] overflow-hidden shadow-2xl h-full">
            {loading ? (
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            ) : (
              <Image
                src={currentAmenity?.image || "/images/default-amenity.jpg"}
                alt={`${currentAmenity?.title || "Business Center Amenities"} - Alfa Business Center Borivali Mumbai Coworking Space`}
                width={400}
                height={700}
                className="object-cover w-full h-full transition-all duration-500 ease-in-out"
                priority
                itemProp="image"
              />
            )}
          </div>

          {/* Blue accent shape bottom-left */}
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 lg:-mb-6 lg:-ml-6 w-12 h-12 lg:w-16 lg:h-16 bg-[#2d386a] rounded-lg">
            <div className="relative w-full h-full">
              <span className="block absolute top-1/2 left-1/4 w-1/5 h-3/5 bg-white -translate-y-1/2 rounded-sm"></span>
              <span className="block absolute left-1/2 top-1/4 w-3/5 h-1/5 bg-white -translate-x-1/2 rounded-sm"></span>
            </div>
          </div>
        </div>

        {/* Right side: Text content - 2/3 width */}
        <div className="w-full lg:w-2/3 flex flex-col">
          {/* Header section with Why Choose Us and See All Amenities button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <p className="text-[#2d386a] font-semibold flex items-center gap-2 text-sm lg:text-base" 
               itemProp="description">
              <span className="inline-block w-3 h-3 bg-[#2d386a] rounded-sm"></span> 
              Premium Coworking Space in Borivali Mumbai
            </p>
            
            <button
              onClick={() => router.push('/amenities')}
              className="w-full sm:w-auto cursor-pointer bg-[#2d386a] text-white hover:bg-[#1e2a5a] transition-colors duration-300 font-medium px-6 py-3 rounded-lg text-sm lg:text-base shadow-md hover:shadow-lg"
              aria-label="View all amenities at Alfa Business Center Coworking Space in Borivali Mumbai"
            >
              Explore All Amenities
            </button>
          </div>

          {/* Dynamic Title based on selected amenity */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 lg:mb-6" 
              itemProp="name">
            {loading ? (
              <div className="space-y-2">
                <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-2/3 animate-pulse"></div>
              </div>
            ) : (
              formatTitle(currentAmenity?.title || "Professional Workspace")
            )}
          </h2>

          {/* Dynamic Description based on selected amenity */}
          <div className="text-gray-600 mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed max-w-3xl min-h-[100px]" 
               itemProp="description">
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse"></div>
              </div>
            ) : (
              <p className="transition-all duration-300 ease-in-out">
                {getOptimizedDescription(currentAmenity?.desc)}
              </p>
            )}
          </div>

          {/* Features grid - Now clickable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-3xl" 
               itemScope 
               itemType="https://schema.org/ItemList">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex gap-3 lg:gap-4 animate-pulse p-3 rounded-lg">
                  <div className="w-6 h-6 bg-gray-300 rounded flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded w-32 lg:w-40 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full max-w-[280px]"></div>
                  </div>
                </div>
              ))
            ) : (
              visibleFeatures.slice(0, 4).map((feature, index) => (
                <Feature
                  key={index}
                  icon={getFeatureIcon(index)}
                  title={feature.title}
                  text={feature.desc}
                  isSelected={selectedAmenity === index}
                  onClick={() => handleAmenityClick(index)}
                  position={index + 1}
                />
              ))
            )}
          </div>

          {/* Hidden SEO content for search engines */}
          <div className="sr-only" aria-hidden="true">
            <h3>Alfa Business Center - Premium Coworking Amenities in Borivali Mumbai</h3>
            <p>
              Alfa Business Center in Borivali West, Mumbai offers comprehensive business amenities 
              including high-speed internet, meeting rooms, private cabins, hot desks, dedicated workspaces, 
              and modern facilities designed for productivity and comfort. Our coworking space provides 
              everything professionals need for successful business operations in Mumbai.
            </p>
            <p>
              Located in Dattani Tower, Kore Kendra, Borivali West, our business center serves professionals 
              from across Mumbai with flexible workspace solutions. Whether you need a private office, 
              meeting room for client presentations, or a collaborative coworking environment, Alfa Business 
              Center has the perfect workspace solution for your business needs.
            </p>
            <ul>
              <li>Coworking Space Borivali Mumbai</li>
              <li>Private Office Solutions Borivali</li>
              <li>Meeting Rooms for Rent Mumbai</li>
              <li>Business Center Amenities Borivali</li>
              <li>Flexible Workspace Mumbai</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Icon mapping based on index
function getFeatureIcon(index: number) {
  const icons = [
    // Quick Access
    <svg key={0} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M12 4h9" />
      <path d="M2 12h20" />
      <path d="M4 6h2a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H4z" />
    </svg>,
    // Efficiency
    <svg key={1} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8l-4 4-4-4" />
      <path d="M12 12v8" />
    </svg>,
    // Reliability
    <svg key={2} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
      <path d="M3 12h18M12 3v18" />
    </svg>,
    // Comfort
    <svg key={3} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="8" x2="8" y2="16" />
      <line x1="8" y1="8" x2="16" y2="16" />
    </svg>
  ];
  return icons[index] || icons[0];
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  isSelected?: boolean;
  onClick: () => void;
  position?: number;
}

function Feature({ icon, title, text, isSelected = false, onClick, position }: FeatureProps) {
  return (
    <div 
      className={`flex gap-3 lg:gap-4 items-start p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
        isSelected 
          ? 'bg-blue-50 border-2 border-[#2d386a] shadow-md' 
          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-200'
      }`}
      onClick={onClick}
      itemScope
      itemType="https://schema.org/LocationFeatureSpecification"
      itemProp="itemListElement"
    >
      <div itemProp="position" content={position?.toString()} className="sr-only">{position}</div>
      <div className={`flex-shrink-0 mt-1 transition-colors duration-300 ${
        isSelected ? 'text-[#2d386a]' : 'text-gray-600'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-semibold text-base lg:text-lg mb-1 lg:mb-2 leading-tight transition-colors duration-300 ${
          isSelected ? 'text-[#2d386a]' : 'text-gray-900'
        }`} itemProp="name">
          {title}
        </h4>
        <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-2" itemProp="description">
          {text}
        </p>
      </div>
    </div>
  );
}