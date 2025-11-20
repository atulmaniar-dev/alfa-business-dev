import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import GalleryClient from "../components/gallery/GalleryClient";

const categories = ["All", "Workspaces", "Meeting Rooms", "Amenities", "Lounge", "Common Areas"];

type Gallery = {
  imageType: string;
  images: string[];
};

// Server component - data fetching directly
async function getGalleryData(): Promise<Gallery[]> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://weworkoffice.in' 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/gallery`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch gallery data');
    }
    
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// Generate Metadata for SEO
export async function generateMetadata() {
  const galleryData = await getGalleryData();
  const allImages = galleryData.flatMap(item => item.images);
  
  return {
    title: "Gallery - Premium Coworking Spaces | Alfa Business Center Borivali Mumbai",
    description: "Explore premium coworking spaces, meeting rooms & amenities through our gallery. Virtual tour of Alfa Business Center in Borivali West, Mumbai.",
    keywords: [
      "coworking space gallery borivali",
      "office photos mumbai", 
      "workspace images borivali west",
      "alfa business center photos",
      "meeting room pictures",
      "virtual tour coworking",
      "shared office gallery",
      "business center images borivali",
      "premium workspace photos mumbai"
    ],
    openGraph: {
      title: "Gallery - Premium Coworking Spaces | Alfa Business Center Borivali Mumbai",
      description: "Explore premium coworking spaces, meeting rooms & amenities through our gallery. Virtual tour of Alfa Business Center in Borivali West, Mumbai.",
      images: allImages.length > 0 ? [allImages[0]] : ['/default-gallery.jpg'],
      url: "https://weworkoffice.in/gallery",
      type: "website",
      siteName: "Alfa Business Center",
      locale: "en_IN",
    },
    twitter: {
      card: 'summary_large_image',
      title: "Gallery - Premium Coworking Spaces | Alfa Business Center Borivali Mumbai",
      description: "Explore premium coworking spaces, meeting rooms & amenities through our gallery",
      images: allImages.length > 0 ? [allImages[0]] : ['/default-gallery.jpg'],
    },
    alternates: {
      canonical: 'https://weworkoffice.in/gallery',
    },
  };
}

// Main Server Component
export default async function GalleryPage() {
  const galleryData = await getGalleryData();

  // Combine all gallery images into a flat array with their category
  const allImages = galleryData.flatMap((item) =>
    item.images.map((url) => ({
      url,
      category: item.imageType,
    }))
  );

  // Structured Data for Image Gallery
  const galleryStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Alfa Business Center Gallery - Coworking Space Borivali Mumbai",
    "description": "Virtual tour of premium coworking spaces, meeting rooms, amenities and facilities at Alfa Business Center Borivali Mumbai",
    "url": "https://weworkoffice.in/gallery",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allImages.length,
      "itemListElement": allImages.map((image, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "ImageObject",
          "contentUrl": image.url,
          "name": `${image.category} - Alfa Business Center Borivali Mumbai`,
          "description": `Premium ${image.category.toLowerCase()} at Alfa Business Center coworking space in Borivali West, Mumbai`,
          "acquireLicensePage": "https://weworkoffice.in/gallery",
          "license": "https://weworkoffice.in/terms",
          "copyrightNotice": "Alfa Business Center",
          "creator": {
            "@type": "Organization",
            "name": "Alfa Business Center"
          }
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alfa Business Center",
      "url": "https://weworkoffice.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://weworkoffice.in/logo.png"
      }
    },
    "locationCreated": {
      "@type": "Place",
      "name": "Borivali, Mumbai",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400092",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.2307",
        "longitude": "72.8567"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <section 
      className="py-20 bg-white"
      itemScope
      itemType="https://schema.org/ImageGallery"
      aria-label="Image Gallery - Alfa Business Center Coworking Space Borivali Mumbai"
    >
      
      {/* Structured Data for Image Gallery */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryStructuredData) }}
      />

      <meta itemProp="name" content="Alfa Business Center Gallery - Coworking Spaces Borivali Mumbai" />
      <meta itemProp="description" content="Explore our premium coworking spaces, meeting rooms, amenities and facilities through our image gallery. Virtual tour of Alfa Business Center in Borivali West, Mumbai." />
      
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          itemProp="headline"
        >
          Explore Our Premium Coworking Spaces in Borivali Mumbai
        </h1>
        <p 
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-10"
          itemProp="description"
        >
          Take a virtual tour of Alfa Business Center&apos;s dynamic and inspiring environments in Borivali West. 
          Discover our modern workspaces, fully-equipped meeting rooms, premium amenities, and collaborative 
          areas designed for productivity and business growth in Mumbai.
        </p>

        {/* ONLY Client Component - No server-rendered images */}
        <GalleryClient 
          initialGalleryData={galleryData} 
          categories={categories}
        />
      </div>

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Virtual Gallery Tour - Alfa Business Center Coworking Space Borivali Mumbai</h2>
        <p>
          Explore our comprehensive image gallery showcasing the premium facilities and modern workspaces 
          at Alfa Business Center in Borivali West, Mumbai. Our visual tour gives you an inside look at 
          what makes us the preferred coworking destination in Mumbai.
        </p>
        
        <h3>Gallery Categories:</h3>
        <ul>
          <li><strong>Workspaces:</strong> Modern desks, private cabins, dedicated workstations with ergonomic furniture at Alfa Business Center Borivali</li>
          <li><strong>Meeting Rooms:</strong> Fully-equipped conference rooms for presentations and client meetings in Borivali West Mumbai</li>
          <li><strong>Amenities:</strong> High-speed internet, printing facilities, pantry, and recreational areas at our Borivali coworking space</li>
          <li><strong>Lounge:</strong> Comfortable seating areas for relaxation and informal meetings at Alfa Business Center Mumbai</li>
          <li><strong>Common Areas:</strong> Collaborative spaces, reception, and shared facilities in Borivali West</li>
        </ul>

        <h3>Featured Spaces at Alfa Business Center Borivali:</h3>
        <p>
          Located in Dattani Tower, Kore Kendra, Borivali West, our coworking space offers:
        </p>
        <ul>
          <li>Modern and professionally designed workspaces in Borivali Mumbai</li>
          <li>Fully-equipped meeting and conference rooms for business meetings</li>
          <li>High-speed fiber internet connectivity throughout the workspace</li>
          <li>Comfortable lounge and breakout areas for networking</li>
          <li>Professional reception and administrative support services</li>
          <li>24/7 security and surveillance systems for safety</li>
          <li>Pantry with complimentary refreshments and beverages</li>
          <li>Printing and scanning facilities for business needs</li>
          <li>Private cabins for focused work and team collaboration</li>
          <li>Hot desks for flexible working arrangements</li>
        </ul>

        <p>
          <strong>Location Advantage:</strong> Our Borivali coworking space is strategically located 
          next to McDonald&apos;s in Borivali West, providing easy access to public transportation, 
          restaurants, banks, and other essential amenities in Mumbai. The location offers excellent 
          connectivity to both western and central Mumbai.
        </p>

        <p>
          <strong>Why Choose Alfa Business Center Gallery?</strong> Our image gallery provides a 
          comprehensive virtual tour of what makes us the best coworking space in Borivali Mumbai. 
          From ergonomic workspaces to state-of-the-art meeting rooms, every aspect is designed to 
          enhance productivity and business growth.
        </p>

        <p>
          Keywords: coworking space gallery borivali, office photos mumbai, workspace images borivali west, 
          alfa business center photos, meeting room pictures, virtual tour coworking, shared office gallery, 
          business center images borivali, premium workspace photos mumbai, borivali west coworking space images,
          alfa business center virtual tour, professional workspace gallery borivali, mumbai office space photos,
          modern coworking facility images, borivali business center gallery
        </p>

        <p>
          <strong>Image Gallery SEO Terms:</strong> visual tour coworking borivali, workspace photography mumbai, 
          office space images, meeting room gallery, business center photos, shared workspace visuals, 
          alfa business center gallery, borivali west coworking pictures, mumbai office gallery, 
          professional workspace photography, corporate office images borivali
        </p>
      </div>
    </section>
  );
}