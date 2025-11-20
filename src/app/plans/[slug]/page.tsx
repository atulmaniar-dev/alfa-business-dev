'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import FaqSection from '@/app/components/reusable/FaqSection';
import PlanPricing from '@/app/components/reusable/PlanPricing';
import Image from 'next/image';
import Head from 'next/head';
import PlanDetailsSkeleton from '@/app/components/skeleton/PlanDetailsSkeleton';
import { Plan } from '@/app/types/plan';

export default function PlanDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [plan, setPlan] = useState<Plan | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch(`/api/plans/${slug}`);
        const data = await res.json();
        setPlan(data);
        setSelectedImage(data.images?.[0] || data.image);
      } catch (err) {
        console.error('Failed to fetch plan:', err);
        setPlan(undefined);
      } finally {
        setIsLoading(false);
      }
    }
    if (slug) fetchPlan();
  }, [slug]);

  // Structured Data for Service/Product
  const serviceStructuredData = plan ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": plan.title,
    "description": plan.description || `${plan.title} - Premium Coworking Space Plan at Alfa Business Center Borivali Mumbai`,
    "url": `https://weworkoffice.in/plans/${slug}`,
    "image": plan.images?.[0] || plan.image,
    "offers": {
      "@type": "Offer",
      "price": plan.monthlyPrice,
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceType": "ListPrice",
        "billingIncrement": 1,
        "unitCode": "MON",
        "billingDuration": "P1M"
      },
      "availability": plan.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Alfa Business Center",
      "url": "https://weworkoffice.in",
      "telephone": "+91-98201-90836",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400092",
        "addressCountry": "IN"
      }
    },
    "areaServed": "Borivali Mumbai",
    "serviceType": "Coworking Space"
  } : null;

  // Breadcrumb Structured Data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://weworkoffice.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Plans",
        "item": "https://weworkoffice.in/plans"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": plan?.title || "Plan Details",
        "item": `https://weworkoffice.in/plans/${slug}`
      }
    ]
  };

  if (isLoading || !plan) {
    return <PlanDetailsSkeleton />;
  }

  const handlePrev = () => {
    const images = plan.images ?? [];
    if (images.length > 1 && selectedImage) {
      const currentIndex = images.findIndex((img) => img === selectedImage);
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setSelectedImage(images[prevIndex]);
    }
  };

  const handleNext = () => {
    const images = plan.images ?? [];
    if (images.length > 1 && selectedImage) {
      const currentIndex = images.findIndex((img) => img === selectedImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex]);
    }
  };

  const pageTitle = `${plan.title} - Premium Coworking Space Plan | Alfa Business Center Borivali Mumbai`;
  const pageDescription = plan.description || `Explore ${plan.title} at Alfa Business Center Borivali Mumbai. Premium coworking space with modern amenities, flexible plans, and professional environment.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${plan.title.toLowerCase()}, coworking space borivali, office space mumbai, shared workspace, business center borivali, alfa business center plans`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={selectedImage || plan.image} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://weworkoffice.in/plans/${slug}`} />
        <meta property="og:site_name" content="Alfa Business Center" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={selectedImage || plan.image} />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://weworkoffice.in/plans/${slug}`} />
        
        {/* Additional Meta */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Alfa Business Center" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Borivali West" />
      </Head>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {serviceStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
        />
      )}

      <div 
        className="max-w-6xl mx-auto px-4 py-10 space-y-10"
        itemScope
        itemType="https://schema.org/Service"
      >
        {/* Breadcrumbs */}
        <nav 
          className="text-sm text-gray-500 flex items-center gap-2"
          aria-label="Breadcrumb"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <span 
            className="hover:underline cursor-pointer" 
            onClick={() => router.push('/')}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content="1" />
            <meta itemProp="name" content="Home" />
            <meta itemProp="item" content="https://weworkoffice.in" />
            Home
          </span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span 
            className="hover:underline cursor-pointer" 
            onClick={() => router.push('/plans')}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content="2" />
            <meta itemProp="name" content="Plans" />
            <meta itemProp="item" content="https://weworkoffice.in/plans" />
            Plans
          </span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span 
            className="font-medium text-gray-800"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
          >
            <meta itemProp="position" content="3" />
            <meta itemProp="name" content={plan.title} />
            <meta itemProp="item" content={`https://weworkoffice.in/plans/${slug}`} />
            {plan.title}
          </span>
        </nav>

        {/* Title & Availability */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 
            className="text-4xl font-extrabold text-[#1e2952]"
            itemProp="name"
          >
            {plan.title} - Premium Coworking Space Borivali Mumbai
          </h1>
          <span 
            className={`px-4 py-1 text-sm font-medium rounded-full ${plan.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            itemProp="availability"
            content={plan.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"}
          >
            {plan.available ? 'Seats Available' : 'Fully Booked'}
          </span>
        </div>

        {/* Main Image */}
        <div className="relative">
          <div className="mb-4 relative">
            <Image
              src={selectedImage || plan.image}
              alt={`${plan.title} - Premium Coworking Space at Alfa Business Center Borivali Mumbai`}
              width={1200}
              height={400}
              className="w-full h-[400px] object-cover rounded-xl shadow-md cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
              priority
              itemProp="image"
            />

            {/* Arrows */}
            {(plan.images?.length ?? 0) > 1 && (
              <>
                <button 
                  onClick={handlePrev} 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  aria-label="Previous image"
                >
                  <ChevronRight className="rotate-180 w-5 h-5 text-gray-700" aria-hidden="true" />
                </button>
                <button 
                  onClick={handleNext} 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {(plan.images?.length ?? 0) > 1 && (
            <div className="flex gap-3 flex-wrap justify-center">
              {plan.images?.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`${plan.title} workspace view ${idx + 1} - Alfa Business Center Borivali`}
                  width={80}
                  height={60}
                  className={`object-cover rounded-md border cursor-pointer hover:opacity-80 ${selectedImage === img ? 'border-blue-600' : 'border-gray-300'}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}

          {/* Zoom Modal */}
          {isModalOpen && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" 
              onClick={() => setIsModalOpen(false)}
              role="dialog"
              aria-label="Image zoom view"
            >
              <div className="relative w-full max-w-6xl px-4" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="absolute top-2 cursor-pointer right-2 text-white bg-black/60 hover:bg-black rounded-full p-1"
                  aria-label="Close image view"
                >
                  ✕
                </button>
                <Image
                  src={selectedImage || plan.image}
                  alt={`Zoomed view of ${plan.title} workspace at Alfa Business Center Borivali Mumbai`}
                  width={1200}
                  height={800}
                  className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
                />
                {(plan.images?.length ?? 0) > 1 && (
                  <>
                    <button 
                      onClick={handlePrev} 
                      className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
                      aria-label="Previous image in zoom view"
                    >
                      <ChevronRight className="rotate-180 w-5 h-5" aria-hidden="true" />
                    </button>
                    <button 
                      onClick={handleNext} 
                      className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
                      aria-label="Next image in zoom view"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & FAQ */}
        <div itemProp="description">
          <PlanPricing plan={plan} />
        </div>
        <FaqSection />

        {/* Hidden SEO Content */}
        <div className="sr-only" aria-hidden="true">
          <h2>{plan.title} - Premium Coworking Space Plan Details</h2>
          <p>
            Discover the {plan.title} at Alfa Business Center, Borivali Mumbai's premier coworking destination. 
            This workspace plan offers modern amenities, flexible terms, and a professional environment 
            designed for productivity and business growth.
          </p>
          <p>
            Located in Dattani Tower, Kore Kendra, Borivali West, our coworking space provides 
            {plan.available ? ' currently available seats' : ' premium workspace solutions'} 
            for professionals, startups, and established businesses in Mumbai.
          </p>
          <h3>Plan Features & Benefits:</h3>
          <ul>
            <li>Modern workspace design with ergonomic furniture</li>
            <li>High-speed fiber internet connectivity</li>
            <li>Access to meeting rooms and common areas</li>
            <li>Professional business address in Borivali Mumbai</li>
            <li>24/7 security and surveillance</li>
            <li>Reception and administrative support</li>
            <li>Networking opportunities with like-minded professionals</li>
          </ul>
          <p>
            <strong>Location Advantage:</strong> Our Borivali coworking space is strategically located 
            next to McDonald's in Borivali West, providing easy access to public transportation, 
            restaurants, and essential amenities.
          </p>
          <p>
            Keywords: {plan.title.toLowerCase()} borivali, coworking space plan mumbai, 
            shared office borivali west, business center plans, alfa business center {plan.title.toLowerCase()}, 
            flexible workspace borivali, office space solutions mumbai
          </p>
        </div>
      </div>
    </>
  );
}