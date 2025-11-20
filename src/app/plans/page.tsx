'use client';
import React, { useEffect, useState } from 'react';
import PlanCard from '@/app/components/reusable/PlanCard';
import FaqSection from '../components/reusable/FaqSection';
import { PlanType } from '@/app/types/plan';
import PlanSkeleton from '@/app/components/reusable/PlanSkeleton';

export default function AllPlansPage() {
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState<number>(4);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        const data = await res.json();
        setPlans(data);
        setSkeletonCount(data.length || 4);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setSkeletonCount(3);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (plans.length > 0 || skeletonCount !== 4) {
      setLoading(false);
    }
  }, [plans, skeletonCount]);

  // Structured Data for Service Catalog
  const serviceCatalogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Coworking Space Plans",
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
    "areaServed": {
      "@type": "City",
      "name": "Borivali, Mumbai"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coworking Space Plans - Borivali Mumbai",
      "itemListElement": plans.map((plan, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": plan.title,
          "description": `Premium ${plan.title.toLowerCase()} plan at Alfa Business Center Borivali Mumbai`,
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
            }
          }
        },
        "position": index + 1
      }))
    }
  };

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }, (_, i) => <PlanSkeleton key={i} />);

  return (
    <section 
      className="bg-gradient-to-b from-[#f5f7fa] to-white py-20"
      itemScope
      itemType="https://schema.org/Service"
      aria-label="Coworking Space Plans - Alfa Business Center Borivali Mumbai"
    >
      
      {/* Structured Data for Service Catalog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogStructuredData) }}
      />

      <meta itemProp="name" content="Coworking Space Plans - Alfa Business Center Borivali Mumbai" />
      <meta itemProp="description" content="Flexible coworking plans for every workspace need in Borivali Mumbai. Hot desks, dedicated desks, private cabins, meeting rooms and virtual office solutions." />
      
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 
          className="text-4xl sm:text-5xl font-bold mb-4 text-[#1e2952]"
          itemProp="headline"
        >
          Flexible Coworking Plans for Every Workspace Need in Borivali Mumbai
        </h1>
        <p 
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          itemProp="description"
        >
          Choose from premium workspace plans at Alfa Business Center Borivali — from daily hot desks to 
          fully equipped private offices. Enjoy modern amenities, high-speed internet, meeting room access, 
          and a productive environment in the heart of Mumbai.
        </p>

        {loading ? (
          <>
            <div className="block sm:hidden mb-12">
              <div className="flex flex-col gap-6">
                {renderSkeletons(skeletonCount)}
              </div>
            </div>
            <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {renderSkeletons(skeletonCount)}
            </div>
          </>
        ) : plans.length === 0 ? (
          <p className="text-red-500">No plans found.</p>
        ) : (
          <>
            {/* Mobile */}
            <div className="block sm:hidden mb-12">
              <div className="flex flex-col gap-6">
                {plans.map((plan, index) => (
                  <div 
                    key={index} 
                    className="w-full max-w-sm mx-auto"
                    itemScope
                    itemType="https://schema.org/Offer"
                  >
                    <PlanCard
                      slug={plan.slug || ''}
                      image={plan.images?.[0] || '/default.jpg'}
                      title={plan.title}
                      price={`₹${Number(plan.monthlyPrice).toLocaleString('en-IN')}`}
                      duration="/ Month"
                      features={plan.monthlyFeatures}
                    />
                    <meta itemProp="name" content={plan.title} />
                    <meta itemProp="price" content={plan.monthlyPrice.toString()} />
                    <meta itemProp="priceCurrency" content="INR" />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className="flex justify-center"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <PlanCard
                    slug={plan.slug || ''}
                    image={plan.images?.[0] || '/default.jpg'}
                    title={plan.title}
                    price={`₹${Number(plan.monthlyPrice).toLocaleString('en-IN')}`}
                    duration="/ Month"
                    features={plan.monthlyFeatures}
                  />
                  <meta itemProp="name" content={plan.title} />
                  <meta itemProp="price" content={plan.monthlyPrice.toString()} />
                  <meta itemProp="priceCurrency" content="INR" />
                </div>
              ))}
            </div>
          </>
        )}

        <div 
          className="mt-20"
          itemScope
          itemType="https://schema.org/ContactPoint"
        >
          <h3 className="text-2xl font-semibold text-[#1e2952] mb-3">
            Not sure which coworking plan is right for your business in Borivali?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact our workspace advisor at Alfa Business Center Borivali to help you find the best match 
            for your office space requirements in Mumbai.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#1e2952] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#10172f] transition"
            aria-label="Contact Alfa Business Center for coworking space consultation in Borivali Mumbai"
            itemProp="url"
          >
            Talk to Our Workspace Expert
          </a>
          <meta itemProp="telephone" content="+91-98201-90836" />
          <meta itemProp="email" content="info@alfaesol.com" />
          <meta itemProp="areaServed" content="Borivali Mumbai" />
          <meta itemProp="availableLanguage" content="English,Hindi,Marathi" />
        </div>

        <FaqSection />

        {/* Hidden SEO Content for Search Engines */}
        <div className="sr-only" aria-hidden="true">
          <h2>Comprehensive Coworking Space Plans in Borivali Mumbai</h2>
          <p>
            Alfa Business Center offers a wide range of flexible coworking plans designed to meet 
            the diverse needs of professionals, startups, and enterprises in Borivali Mumbai. 
            Our workspace solutions cater to every budget and requirement.
          </p>
          
          <h3>Types of Coworking Plans Available at Alfa Business Center Borivali:</h3>
          <ul>
            <li><strong>Hot Desk Plans:</strong> Flexible seating options for remote workers and freelancers</li>
            <li><strong>Dedicated Desk Plans:</strong> Personal workspace with storage and monitor options</li>
            <li><strong>Private Cabin Plans:</strong> Fully enclosed offices for teams of 2-10 people</li>
            <li><strong>Meeting Room Plans:</strong> Hourly and daily rental of professional meeting spaces</li>
            <li><strong>Virtual Office Plans:</strong> Premium business address with mail handling</li>
          </ul>

          <h3>Why Choose Alfa Business Center for Coworking in Borivali Mumbai?</h3>
          <p>
            Located in the heart of Borivali West at Dattani Tower, Kore Kendra, Alfa Business Center 
            provides premium workspace solutions with modern amenities, high-speed internet, 
            meeting room access, and a vibrant business community.
          </p>

          <p>
            <strong>Key Features of Our Coworking Plans:</strong>
          </p>
          <ul>
            <li>High-speed fiber internet connectivity</li>
            <li>Access to meeting rooms and conference facilities</li>
            <li>Fully furnished and ergonomic workspace</li>
            <li>24/7 security and CCTV surveillance</li>
            <li>Reception and administrative support</li>
            <li>Pantry area with complimentary tea/coffee</li>
            <li>Printing and scanning facilities</li>
            <li>Networking events and community activities</li>
          </ul>

          <p>
            Whether you're a freelancer looking for a hot desk, a startup needing a private cabin, 
            or an enterprise requiring multiple dedicated desks, Alfa Business Center in Borivali 
            has the perfect workspace solution for your business needs in Mumbai.
          </p>

          <p>
            Keywords: coworking space plans borivali, office space pricing mumbai, flexible workspace plans, 
            alfa business center pricing, shared office costs borivali, private cabin rates mumbai, 
            hot desk prices borivali west, virtual office plans, meeting room rental rates, 
            premium workspace solutions borivali
          </p>
        </div>
      </div>
    </section>
  );
}