'use client';
import FeatureCard from "@/app/components/reusable/FeatureCard";
import BookTourCTA from "../components/reusable/BookTourCTA";
import { useEffect, useState } from "react";

type Amenity = {
  _id: string;
  amenitiesName: string;
  tag: string;
  description: string;
  image: string[];
};

export default function Amenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAmenities = async () => {
    try {
      const res = await fetch('/api/amenities');
      if (!res.ok) throw new Error('Failed to fetch amenities');
      const data = await res.json();
      setAmenities(data);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  // Structured Data for Amenities
  const amenitiesStructuredData = {
    "@context": "https://schema.org",
    "@type": "BusinessCenter",
    "name": "Alfa Business Center",
    "description": "Premium coworking space in Borivali Mumbai with world-class amenities",
    "url": "https://weworkoffice.in/amenities",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400092",
      "addressCountry": "IN"
    },
    "amenityFeature": amenities.map((amenity, index) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity.amenitiesName,
      "description": amenity.description,
      "value": true
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coworking Space Amenities",
      "description": "Premium amenities available at Alfa Business Center Borivali Mumbai"
    }
  };

  return (
    <section 
      className="pt-16 bg-white"
      itemScope
      itemType="https://schema.org/BusinessCenter"
      aria-label="Premium Amenities at Alfa Business Center Coworking Space Borivali Mumbai"
    >
      
      {/* Structured Data for Amenities */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(amenitiesStructuredData) }}
      />

      <meta itemProp="name" content="World-Class Amenities - Alfa Business Center Borivali Mumbai" />
      <meta itemProp="description" content="Explore premium amenities at Alfa Business Center Borivali including high-speed internet, meeting rooms, private cabins, lounge areas and more for productive coworking." />
      
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h1 
          className="text-4xl sm:text-5xl font-bold mb-4 text-[#1e2952]"
          itemProp="headline"
        >
          World-Class Amenities at Alfa Business Center Borivali Mumbai
        </h1>
        <p 
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          itemProp="description"
        >
          Experience premium coworking with our extensive range of modern amenities at Alfa Business Center Borivali. 
          From high-speed internet to fully-equipped meeting rooms, we provide everything for a productive and comfortable work environment in Mumbai.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading amenities...</p>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {amenities.map((item, index) => (
              <div
                key={item._id}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={(index + 1).toString()} />
                <FeatureCard
                  image={item.image?.[0] || '/placeholder.jpg'}
                  title={item.amenitiesName}
                  desc={item.description}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden SEO Content */}
      <div className="sr-only" aria-hidden="true">
        <h2>Comprehensive Amenities at Alfa Business Center Borivali Mumbai</h2>
        <p>
          Alfa Business Center in Borivali West offers premium amenities designed to enhance productivity 
          and comfort for professionals, startups, and enterprises. Our coworking space in Mumbai provides 
          state-of-the-art facilities to support your business needs.
        </p>
        
        <h3>Premium Workspace Amenities Include:</h3>
        <ul>
          <li><strong>High-Speed Internet:</strong> Fiber-optic connectivity throughout the workspace</li>
          <li><strong>Meeting Rooms:</strong> Fully-equipped conference and meeting spaces</li>
          <li><strong>Private Cabins:</strong> Sound-proof offices for focused work</li>
          <li><strong>Lounge Areas:</strong> Comfortable spaces for relaxation and networking</li>
          <li><strong>Pantry & Kitchen:</strong> Well-stocked with refreshments and snacks</li>
          <li><strong>Printing Facilities:</strong> Professional printing, scanning and copying services</li>
          <li><strong>Reception Services:</strong> Professional front desk and administrative support</li>
          <li><strong>Security Systems:</strong> 24/7 CCTV surveillance and access control</li>
        </ul>

        <h3>Why Choose Our Amenities in Borivali?</h3>
        <p>
          Located in Dattani Tower, Kore Kendra, Borivali West, Alfa Business Center provides 
          Mumbai's professionals with premium amenities that rival corporate office spaces. 
          Our facilities are designed to boost productivity, foster collaboration, and provide 
          a comfortable working environment.
        </p>

        <p>
          <strong>Additional Features:</strong>
        </p>
        <ul>
          <li>Ergonomic furniture and seating</li>
          <li>Ample natural lighting</li>
          <li>Air-conditioned workspaces</li>
          <li>Power backup and UPS</li>
          <li>Mail handling services</li>
          <li>Networking events</li>
          <li>Community areas</li>
          <li>Phone booths for private calls</li>
        </ul>

        <p>
          Keywords: coworking space amenities borivali, office facilities mumbai, business center features, 
          alfa business center amenities, shared workspace facilities borivali, premium office amenities mumbai, 
          meeting rooms borivali, high-speed internet coworking, private cabins borivali west
        </p>
      </div>

      <BookTourCTA />
    </section>
  );
}