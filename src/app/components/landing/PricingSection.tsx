'use client';

import PlanCard from '@/app/components/reusable/PlanCard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Plan = {
  slug: string;
  images: string[];
  title: string;
  popular: boolean;
  monthlyPrice: number;
  monthlyFeatures: string[];
};

export default function PopularPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        if (!res.ok) throw new Error('Failed to fetch plans');
        const data = await res.json();
        console.log(data);
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error('Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const SkeletonCard = () => (
    <div className="w-[400px] max-w-full transition border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col">
      <div className="w-full h-40 bg-gray-300" />

      <div className="p-5 flex flex-col gap-y-4 flex-1">
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 rounded w-1/2" /> {/* Title */}
          <div className="h-6 bg-gray-300 rounded w-1/3" /> {/* Price */}
        </div>

        <ul className="space-y-2">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full mt-1" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
            </li>
          ))}
        </ul>

        <div className="mt-auto h-10 bg-gray-300 rounded w-full" />
      </div>
    </div>
  );

  const popularPlans = plans.filter((plan) => plan.popular);

  // Structured Data for Service Offerings
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Coworking Space Plans",
    "description": "Flexible coworking and office space solutions in Borivali, Mumbai",
    "provider": {
      "@type": "BusinessCenter",
      "name": "Alfa Business Center",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400092",
        "addressCountry": "IN"
      }
    },
    "areaServed": "Borivali, Mumbai",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coworking Space Plans",
      "itemListElement": popularPlans.map((plan, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": plan.title,
          "description": `Coworking space plan in Borivali Mumbai: ${plan.monthlyFeatures.join(', ')}`,
          "price": plan.monthlyPrice,
          "priceCurrency": "INR"
        },
        "position": index + 1
      }))
    }
  };

  return (
    <section className="bg-white py-16" 
             itemScope 
             itemType="https://schema.org/Service"
             aria-label="Popular Coworking Space Plans in Borivali Mumbai">
      
      {/* Structured Data for Service Offerings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* SEO Optimized Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2d386a] mb-4" itemProp="name">
          Flexible Coworking Space Plans in Borivali, Mumbai
        </h2>
        
        {/* SEO Rich Description */}
        <div className="text-gray-600 mb-10 max-w-2xl mx-auto text-base sm:text-lg" itemProp="description">
          <p>
            Alfa Business Center in Borivali offers flexible coworking plans perfect for Mumbai professionals. 
            Choose from hot desks, dedicated workspaces, private cabins, and meeting rooms - all with premium 
            amenities and high-speed internet included.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
               itemScope 
               itemType="https://schema.org/ItemList">
            {popularPlans.map((plan, index) => (
              <div key={plan.slug} itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
                {/* Hidden structured data for each plan */}
                <meta itemProp="position" content={(index + 1).toString()} />
                <PlanCard
                  slug={plan.slug}
                  image={plan.images?.[0] || ''}
                  title={plan.title}
                  price={`₹${plan.monthlyPrice}`}
                  duration="/ Month"
                  features={plan.monthlyFeatures}
                />
              </div>
            ))}
          </div>
        )}

        {/* Hidden SEO content for search engines */}
        <div className="sr-only" aria-hidden="true">
          <h3>Affordable Coworking Space Pricing in Borivali Mumbai</h3>
          <p>
            Alfa Business Center provides competitive pricing for coworking spaces in Borivali, Mumbai. 
            Our flexible monthly plans start from just ₹5,999 for hot desks, making professional workspace 
            accessible for freelancers, startups, and established businesses in Mumbai.
          </p>
          <p>
            Located in Borivali West, our business center offers various workspace solutions including:
          </p>
          <ul>
            <li>Hot Desks from ₹5,999/month - Flexible coworking with all amenities</li>
            <li>Dedicated Desks from ₹6,500/month - Personal workspace in shared environment</li>
            <li>Private Cabins from ₹24,999/month - Team offices with privacy</li>
            <li>Meeting Rooms - Professional spaces for client meetings</li>
          </ul>
          <p>
            All plans include high-speed internet, access to common areas, meeting room credits, 
            and premium business amenities. Perfect for professionals seeking affordable yet premium 
            office space solutions in Borivali, Mumbai.
          </p>
          <p>
            <strong>Location:</strong> Dattani Tower, Kore Kendra, Borivali West, Mumbai - 400092
            <br />
            <strong>Contact:</strong> +91-98201-90836 for customized workspace solutions
          </p>
        </div>

        {/* Additional Structured Data for Aggregate Offer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AggregateOffer",
              "name": "Coworking Space Plans",
              "description": "Flexible workspace solutions in Borivali Mumbai",
              "offerCount": popularPlans.length,
              "offers": popularPlans.map(plan => ({
                "@type": "Offer",
                "name": plan.title,
                "price": plan.monthlyPrice,
                "priceCurrency": "INR",
                "priceValidUntil": "2026-12-31",
                "url": `https://weworkoffice.in/plans/${plan.slug}`,
                "availability": "https://schema.org/InStock",
                "validFrom": "2027-01-01"
              }))
            })
          }}
        />
      </div>
    </section>
  );
}