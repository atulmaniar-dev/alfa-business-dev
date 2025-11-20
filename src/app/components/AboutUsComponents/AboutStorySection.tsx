import React from "react";

export default function AboutStorySection() {
  // Structured Data for Video and Organization Story
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Alfa Business Center Story - Premium Coworking Space in Borivali Mumbai",
    "description": "Discover the journey of Alfa Business Center, pioneering coworking excellence in Borivali Mumbai with innovative workspace solutions",
    "thumbnailUrl": "/about-video-thumbnail.png",
    "uploadDate": "2024-01-01",
    "duration": "PT2M",
    "contentUrl": "/cowroking.mp4",
    "embedUrl": "https://weworkoffice.in/about",
    "publisher": {
      "@type": "Organization",
      "name": "Alfa Business Center",
      "url": "https://weworkoffice.in"
    },
    "locationCreated": {
      "@type": "Place",
      "name": "Borivali, Mumbai",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400092"
      }
    }
  };

  return (
    <section className="py-20 bg-white" 
             itemScope 
             itemType="https://schema.org/AboutPage"
             aria-label="Our Story - Alfa Business Center Coworking Space Borivali Mumbai">
      
      {/* Structured Data for Video */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bolder text-gray-900 mb-6" itemProp="headline">
            Our Story: Pioneering Coworking Excellence in Borivali Mumbai
          </h2>
          <div className="text-gray-600 leading-relaxed text-base space-y-4" itemProp="text">
            <p>
              Alfa Business Center has consistently led the private office space and virtual office market 
              in Borivali, Mumbai with a unique, innovative perspective. Our commitment to offering 
              entrepreneurs, freelancers, and small businesses genuine workspace solutions has 
              revolutionized the concept of expensive traditional offices and impersonal coworking spaces.
            </p>
            <p>
              We understand the true essence of coworking and its significance in modern business culture. 
              Welcome to the contemporary office culture of the 21st century. Welcome to Alfa Business Center 
              - where innovation meets workspace excellence in the heart of Borivali, Mumbai.
            </p>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>500+ Professionals Served</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Prime Borivali Location</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Modern Workspace Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Flexible Office Plans</span>
            </div>
          </div> */}
        </div>

        {/* Right: Video Thumbnail */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-sm" 
               itemScope 
               itemType="https://schema.org/VideoObject">
            <meta itemProp="name" content="Alfa Business Center Coworking Space Tour - Borivali Mumbai" />
            <meta itemProp="description" content="Take a virtual tour of our premium coworking space in Borivali Mumbai featuring modern workspaces, private cabins, and meeting rooms" />
            <meta itemProp="uploadDate" content="2024-01-01" />
            <meta itemProp="thumbnailUrl" content="/about-video-thumbnail.png" />
            
            <video
              src="/cowroking.mp4"
              width={640}
              height={400}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover rounded-xl"
              poster="/about-video-thumbnail.png"
              aria-label="Video tour of Alfa Business Center coworking space in Borivali Mumbai"
              title="Alfa Business Center - Coworking Space Tour Borivali Mumbai"
              itemProp="contentUrl"
            />
            <div className="sr-only" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Alfa Business Center" />
              <meta itemProp="url" content="https://weworkoffice.in" />
            </div>
          </div>
          
          {/* Video Description for SEO */}
          <p className="text-sm text-gray-500 mt-2 text-center">
            Experience our premium coworking space in Borivali Mumbai through this virtual tour
          </p>
        </div>
      </div>

      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h3>The Alfa Business Center Story - Revolutionizing Workspaces in Borivali Mumbai</h3>
        <p>
          Alfa Business Center began its journey with a vision to transform the traditional office 
          landscape in Borivali, Mumbai. Recognizing the growing need for flexible, affordable, and 
          professional workspace solutions, we pioneered the coworking concept in the western suburbs 
          of Mumbai.
        </p>
        <p>
          Our story is one of innovation and commitment to the business community of Borivali. 
          Located strategically in Dattani Tower, Kore Kendra, Borivali West, we've become the 
          go-to destination for professionals seeking modern workspace solutions without the 
          overheads of traditional office spaces.
        </p>
        <p>
          <strong>Our Journey Includes:</strong>
        </p>
        <ul>
          <li>Pioneering coworking spaces in Borivali Mumbai</li>
          <li>Introducing flexible office solutions for modern professionals</li>
          <li>Building a vibrant community of entrepreneurs and businesses</li>
          <li>Constantly upgrading amenities to meet evolving workspace needs</li>
          <li>Serving 500+ professionals across various industries</li>
        </ul>
        <p>
          At Alfa Business Center, we believe that the right workspace can significantly impact 
          productivity, creativity, and business growth. Our Borivali location offers the perfect 
          blend of professional environment and modern amenities, making it the ideal choice for 
          Mumbai's dynamic business community.
        </p>
        <p>
          Keywords: alfa business center story borivali, coworking space journey mumbai, 
          office space innovation borivali west, workspace revolution mumbai, 
          business center history, premium coworking borivali story
        </p>
      </div>
    </section>
  );
}