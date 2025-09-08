'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import FaqSection from '@/app/components/reusable/FaqSection';
import PlanPricing from '@/app/components/reusable/PlanPricing';
import Image from 'next/image';
import Head from 'next/head';
import PlanDetailsSkeleton from '@/app/components/skeleton/PlanDetailsSkeleton';
import { Plan } from '@/app/types/plan'; // ✅ Make sure you have a type

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

  return (
    <>
      <Head>
        <title>{plan.title} | Alfa Business Center</title>
        <meta name="description" content={plan.description?.slice(0, 150) || 'Explore workspace plans at Alfa Business Center.'} />
        <meta property="og:title" content={plan.title} />
        <meta property="og:description" content={plan.description?.slice(0, 150) || ''} />
        <meta property="og:image" content={selectedImage || plan.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.weworkoffice.in/plans/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://www.weworkoffice.in/plans/${slug}`} />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/')}>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/plans')}>Plans</span>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-gray-800">{plan.title}</span>
        </div>

        {/* Title & Availability */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-4xl font-extrabold text-[#1e2952]">{plan.title}</h1>
          <span className={`px-4 py-1 text-sm font-medium rounded-full ${plan.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {plan.available ? 'Seats Available' : 'Fully Booked'}
          </span>
        </div>

        {/* Main Image */}
        <div className="relative">
          <div className="mb-4 relative">
            <Image
              src={selectedImage || plan.image}
              alt={plan.title || 'Plan image'}
              width={1200}
              height={400}
              className="w-full h-[400px] object-cover rounded-xl shadow-md cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
              priority
            />

            {/* Arrows */}
            {(plan.images?.length ?? 0) > 1 && (
              <>
                <button onClick={handlePrev} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">
                  <ChevronRight className="rotate-180 w-5 h-5 text-gray-700" />
                </button>
                <button onClick={handleNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">
                  <ChevronRight className="w-5 h-5 text-gray-700" />
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
                  alt={`${plan.title} thumbnail ${idx + 1}`}
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
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
              <div className="relative w-full max-w-6xl px-4" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setIsModalOpen(false)} className="absolute top-2 cursor-pointer right-2 text-white bg-black/60 hover:bg-black rounded-full p-1">✕</button>
                <Image
                  src={selectedImage || plan.image}
                  alt={`Zoomed view of ${plan.title}`}
                  width={1200}
                  height={800}
                  className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
                />
                {(plan.images?.length ?? 0) > 1 && (
                  <>
                    <button onClick={handlePrev} className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2">
                      <ChevronRight className="rotate-180 w-5 h-5" />
                    </button>
                    <button onClick={handleNext} className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & FAQ */}
        <PlanPricing plan={plan} />
        <FaqSection />
      </div>
    </>
  );
}
