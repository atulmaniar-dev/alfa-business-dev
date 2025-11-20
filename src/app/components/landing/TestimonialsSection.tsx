'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Quote, MapPin } from 'lucide-react';

type Testimonial = {
  message: string;
  name: string;
  title: string;
  image: string;
  status: string;
  companyLogo: string;
};

export default function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        const approvedTestimonials = data.filter((t: Testimonial) => t.status === "approved");
        setTestimonialsData(approvedTestimonials);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!testimonialsData.length || testimonialsData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonialsData.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  // Generate Review Structured Data
  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "BusinessCenter",
    "name": "Alfa Business Center",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": testimonialsData.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonialsData.map((testimonial, index) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.message,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-01-01",
      "publisher": {
        "@type": "Organization",
        "name": "Alfa Business Center"
      }
    }))
  };

  if (loading) {
    return (
      <section className=" py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side Skeleton */}
            <div className="space-y-6">
              <div className="h-16 bg-gray-200 rounded w-80 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mb-8 animate-pulse"></div>
              <div className="h-px bg-gray-300 mb-8"></div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Right Side Skeleton */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
                <div className="h-8 bg-gray-200 rounded w-20 mb-6 animate-pulse"></div>
                <div className="h-32 bg-gray-200 rounded animate-pulse mb-8"></div>
                <div className="h-px bg-gray-300 mb-6"></div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonialsData.length) {
    return null;
  }

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className=" py-20 lg:py-28" 
             itemScope 
             itemType="https://schema.org/BusinessCenter"
             aria-label="Customer Testimonials for Alfa Business Center Coworking Space in Borivali Mumbai">
      
      {/* Review Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Modern Design */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-[#2d386a] font-semibold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-[#2d386a] rounded-full"></span>
                CLIENT TESTIMONIALS
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight" itemProp="name">
                Mumbai Professionals{" "}
                <span className="text-[#2d386a]">
                  Love Our Space
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed" itemProp="description">
                Discover why startups, freelancers, and enterprises choose Alfa Business Center 
                as their preferred coworking space in Borivali, Mumbai.
              </p>
            </div>

            {/* Location Trust Badge */}
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-[#2d386a]" />
              <span className="text-sm">
                Trusted by <strong>100+ Mumbai professionals</strong> at our Borivali location
              </span>
            </div>

            <div className="h-0.5 bg-[#2d386a]/20 w-24 my-8"></div>

            {/* Navigation and Counter */}
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous customer testimonial"
                  className="w-12 h-12 cursor-pointer bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-[#2d386a] hover:border-[#2d386a] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next customer testimonial"
                  className="w-12 h-12 bg-white cursor-pointer border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-[#2d386a] hover:border-[#2d386a] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-2xl font-bold text-[#2d386a]">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-gray-300">/</span>
                <span>{String(testimonialsData.length).padStart(2, '0')}</span>
                <span className="text-xs text-gray-400 ml-2">
                  Verified Reviews
                </span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-green-500">★</span>
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-500">✓</span>
                <span>100% Verified Clients</span>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Testimonial Card */}
          <div className="relative">
            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#2d386a]/10 rounded-full blur-xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#2d386a]/10 rounded-full blur-xl opacity-50"></div>
            
            {/* Main Testimonial Card */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500"
                 itemScope 
                 itemType="https://schema.org/Review"
                 itemProp="review">
              
              {/* Review Rating Structured Data */}
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="sr-only">
                <meta itemProp="ratingValue" content="5" />
                <meta itemProp="bestRating" content="5" />
              </div>
              <meta itemProp="author" content={currentTestimonial.name} />
              <meta itemProp="datePublished" content="2024-01-01" />
              <meta itemProp="publisher" content="Alfa Business Center" />

              {/* Quote Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-[#2d386a] rounded-xl flex items-center justify-center">
                  <Quote className="w-6 h-6 text-white" fill="currentColor" />
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 font-medium italic" itemProp="reviewBody">
                "{currentTestimonial.message}"
              </blockquote>

              {/* Separator */}
              <div className="h-0.5 bg-[#2d386a]/10 mb-6"></div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#2d386a] p-0.5">
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <Image
                        src={currentTestimonial.image}
                        alt={`${currentTestimonial.name} - Client at Alfa Business Center Borivali Mumbai`}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  {/* Online Indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg" itemProp="author">{currentTestimonial.name}</p>
                  <p className="text-gray-600 text-sm">{currentTestimonial.title}</p>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mt-1" aria-label="Rated 5 out of 5 stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-[#2d386a]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        role="img"
                        aria-label="Star rating"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Logo (if available) */}
              {currentTestimonial.companyLogo && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Works at</span>
                    <div className="w-20 h-6 relative">
                      <Image
                        src={currentTestimonial.companyLogo}
                        alt={`${currentTestimonial.name}'s company logo`}
                        width={80}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12 lg:mt-16">
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#2d386a] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial from ${testimonialsData[index]?.name} about Alfa Business Center Borivali`}
              />
            ))}
          </div>
        </div>

        {/* Hidden SEO content for search engines */}
        <div className="sr-only" aria-hidden="true">
          <h2>Client Reviews & Testimonials - Alfa Business Center Borivali Mumbai</h2>
          <p>
            Read authentic reviews and testimonials from professionals who have experienced 
            Alfa Business Center's premium coworking space in Borivali, Mumbai. Our clients 
            include startups, freelancers, SMEs, and established enterprises who appreciate 
            our modern amenities, flexible workspace solutions, and professional environment.
          </p>
          <p>
            Located in Dattani Tower, Kore Kendra, Borivali West, Alfa Business Center has 
            earned a 4.8/5 rating from over {testimonialsData.length} verified clients. 
            Our coworking space is praised for its high-speed internet, comfortable workspaces, 
            meeting rooms, and vibrant community of Mumbai professionals.
          </p>
          <p>
            Keywords: coworking space reviews mumbai, business center testimonials borivali, 
            office space feedback, shared workspace ratings, Alfa Business Center client reviews, 
            borivali coworking testimonials
          </p>
          <ul>
            <li>Premium coworking space in Borivali Mumbai</li>
            <li>Flexible office solutions with modern amenities</li>
            <li>Professional meeting rooms and private cabins</li>
            <li>High-speed internet and business facilities</li>
            <li>Vibrant community of Mumbai professionals</li>
          </ul>
        </div>
      </div>
    </section>
  );
}