import Image from "next/image";

const trustedLogos = [
  "clogo1.jpg", "clogo2.png", "clogo3.webp",
  "clogo1.jpg", "clogo2.png", "clogo3.webp",
  "clogo1.jpg", "clogo2.png", "clogo3.webp",
];

export default function TrustedBySection() {
  const repeated = [...trustedLogos, ...trustedLogos]; // for marquee effect

  // Structured Data for Organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alfa Business Center",
    "description": "Premium coworking space in Borivali, Mumbai trusted by leading companies and professionals",
    "url": "https://weworkoffice.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400092",
      "addressCountry": "IN"
    },
    "knowsAbout": [
      "Coworking Space Solutions",
      "Office Space Management",
      "Business Center Operations",
      "Workspace Amenities",
      "Professional Meeting Rooms"
    ]
  };

  return (
    <section className=" bg-white px-4 sm:px-6 lg:px-10 relative" 
             itemScope 
             itemType="https://schema.org/Organization"
             aria-label="Trusted by Leading Companies - Alfa Business Center Borivali Mumbai">
      
      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-10">
          <h2 className="text-gray-600 text-lg font-semibold" itemProp="name">
            Trusted by Mumbai's Leading Companies & Professionals
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
            Join 100+ established businesses, startups, and professionals who trust 
            Alfa Business Center for their workspace needs in Borivali, Mumbai
          </p>
        </div>

        {/* Fade Sides */}
        <div className="absolute top-0 left-0 w-16 h-full z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 w-16 h-full z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="space-y-6">
          {/* Row 1: Infinite Scroll Marquee */}
          <div className="overflow-hidden">
            <div className="flex w-max gap-10 animate-marquee">
              {repeated.map((logo, index) => (
                <div key={`row1-${index}`} className="w-28 md:w-32 lg:w-36 shrink-0">
                  <Image
                    src={`/${logo}`}
                    alt={`Trusted company logo ${index + 1} - Alfa Business Center Borivali Mumbai client`}
                    width={150}
                    height={60}
                    className="w-full h-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                    title={`Trusted client of Alfa Business Center coworking space in Borivali`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Center-aligned, auto-scrollable on mobile */}
          <div className="overflow-x-auto sm:overflow-hidden">
            <div className="flex flex-nowrap justify-center gap-10 sm:justify-center sm:overflow-hidden min-w-full">
              {trustedLogos.map((logo, index) => (
                <div key={`row2-${index}`} className="w-28 md:w-32 lg:w-36 shrink-0">
                  <Image
                    src={`/${logo}`}
                    alt={`Business partner logo ${index + 1} - Alfa Business Center Borivali Mumbai`}
                    width={150}
                    height={60}
                    className="w-full h-auto object-contain"
                    title={`Partner company at Alfa Business Center Borivali`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden SEO content for search engines */}
        <div className="sr-only" aria-hidden="true">
          <h3>Trusted Business Partners & Clients - Alfa Business Center Borivali</h3>
          <p>
            Alfa Business Center in Borivali, Mumbai is proud to be trusted by leading companies, 
            startups, and professional organizations. Our coworking space serves a diverse community 
            of businesses including IT companies, marketing agencies, financial consultants, 
            legal firms, and growing startups from across Mumbai.
          </p>
          <p>
            Located in Borivali West, our business center has become the preferred workspace 
            solution for professionals seeking premium amenities, flexible plans, and a 
            collaborative environment. We serve clients from various industries who appreciate 
            our modern facilities and professional workspace solutions.
          </p>
          <p>
            <strong>Why companies choose Alfa Business Center Borivali:</strong>
          </p>
          <ul>
            <li>Premium coworking space with modern amenities</li>
            <li>Flexible workspace solutions for teams of all sizes</li>
            <li>Professional meeting rooms and private cabins</li>
            <li>High-speed internet and business infrastructure</li>
            <li>Strategic location in Borivali West with easy access</li>
            <li>Vibrant community of like-minded professionals</li>
          </ul>
          <p>
            <strong>Industries we serve:</strong> IT & Technology, Marketing & Advertising, 
            Financial Services, Legal Consultancy, Education & Training, Healthcare Services, 
            E-commerce, Startups & Entrepreneurs, Freelancers & Remote Workers.
          </p>
          <p>
            Join the growing community of successful businesses that trust Alfa Business Center 
            for their workspace needs in Borivali, Mumbai. Experience the perfect blend of 
            professionalism and flexibility at our premium coworking location.
          </p>
          <p>
            Keywords: trusted coworking space borivali, business center clients mumbai, 
            company partners alfa business center, professional workspace borivali west, 
            office space trusted companies, shared workspace business partners
          </p>
        </div>
      </div>
    </section>
  );
}