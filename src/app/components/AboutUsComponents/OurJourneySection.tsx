import {
  RocketIcon,
  BuildingIcon,
  MedalIcon,
  HeartIcon,
  LaptopIcon,
} from "lucide-react";

const timelineData = [
  {
    year: "2020",
    title: "Founded Alfa Business Center - Borivali's First Premium Coworking Space",
    description: "Established with a vision to revolutionize shared workspaces in Mumbai, focusing on community and innovation. Pioneered the coworking concept in Borivali West with premium office solutions for Mumbai professionals.",
    icon: <RocketIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
    seoKeywords: ["coworking space borivali founded", "alfa business center established", "premium office space mumbai 2020"]
  },
  {
    year: "2021",
    title: "Expansion of Core Facilities & Private Office Solutions",
    description: "Launched new private offices and state-of-the-art meeting rooms, enhancing our service offerings. Became Borivali's preferred destination for dedicated cabins and professional workspace solutions.",
    icon: <BuildingIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
    seoKeywords: ["private offices borivali", "meeting rooms mumbai expansion", "business center facilities upgrade"]
  },
  {
    year: "2022",
    title: "Achieved 95% Occupancy - Trusted by 200+ Professionals",
    description: "Reached full occupancy with a diverse portfolio of startups and established businesses. Became the most trusted coworking space in Borivali Mumbai for entrepreneurs and enterprises.",
    icon: <MedalIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
    seoKeywords: ["coworking space borivali occupancy", "trusted workspace mumbai", "professional office solutions"]
  },
  {
    year: "2023",
    title: "Introduced Wellness Programs & Community Building Initiatives",
    description: "Initiated a series of wellness workshops and networking events to support our members' holistic well-being. Strengthened our position as Borivali's leading business community hub.",
    icon: <HeartIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
    seoKeywords: ["wellness programs coworking", "business community borivali", "networking events mumbai"]
  },
  {
    year: "2024",
    title: "Launched Digital Membership & Virtual Office Solutions",
    description: "Introduced flexible virtual office and digital membership options to cater to remote teams and hybrid work models. Expanded our reach across Mumbai with innovative workspace solutions.",
    icon: <LaptopIcon className="h-5 w-5 text-[rgb(45,56,106)]" />,
    seoKeywords: ["virtual office borivali", "digital membership mumbai", "hybrid workspace solutions"]
  },
];

// Structured Data for Timeline
const timelineStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Alfa Business Center",
  "description": "Premium coworking space in Borivali Mumbai offering flexible workspace solutions",
  "url": "https://weworkoffice.in",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "name": "Borivali, Mumbai",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400092"
    }
  },
  "knowsAbout": [
    "Coworking Space Management",
    "Office Space Solutions Borivali",
    "Virtual Office Services Mumbai",
    "Meeting Room Rentals",
    "Business Center Operations"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Indian Coworking Space Association"
  }
};

export default function OurJourneySection() {
  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-20 bg-white"
      itemScope
      itemType="https://schema.org/AboutPage"
      aria-label="Our Journey - Alfa Business Center Growth Timeline Borivali Mumbai"
    >
      
      {/* Structured Data for Organization Timeline */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(timelineStructuredData) }}
      />

      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4"
          itemProp="headline"
        >
          Our Journey: Transforming Workspaces in Borivali Mumbai
        </h2>
        
        <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto" itemProp="description">
          From pioneering coworking in Borivali to becoming Mumbai's trusted business center - 
          discover our milestone journey in revolutionizing workspace solutions
        </p>

        {/* Desktop View */}
        <div className="hidden md:grid relative grid-cols-9 gap-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[rgb(45,56,106)] z-0" />

          {timelineData.map((item, index) => (
            <div key={index} className="contents">
              {/* Left content */}
              <div
                className={`col-span-4 ${index % 2 === 0 ? "flex justify-end" : ""}`}
                itemScope
                itemType="https://schema.org/Event"
              >
                {index % 2 === 0 && (
                  <div 
                    className="bg-gray-100 p-6 rounded-xl shadow-sm max-w-md w-full text-right"
                    itemProp="description"
                  >
                    <meta itemProp="startDate" content={`${item.year}-01-01`} />
                    <meta itemProp="name" content={item.title} />
                    <p className="text-[rgb(45,56,106)] text-sm font-semibold" itemProp="keywords">
                      {item.year}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2" itemProp="alternateName">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className="col-span-1 flex items-center justify-center z-10 relative">
                <div 
                  className="w-10 h-10 rounded-full bg-white border-2 border-[rgb(45,56,106)] shadow flex items-center justify-center"
                  itemProp="location"
                  itemScope
                  itemType="https://schema.org/Place"
                >
                  <meta itemProp="name" content="Alfa Business Center Borivali" />
                  {item.icon}
                </div>
              </div>

              {/* Right content */}
              <div
                className={`col-span-4 ${index % 2 !== 0 ? "flex justify-start" : ""}`}
                itemScope
                itemType="https://schema.org/Event"
              >
                {index % 2 !== 0 && (
                  <div 
                    className="bg-gray-100 p-6 rounded-xl shadow-sm max-w-md w-full text-left"
                    itemProp="description"
                  >
                    <meta itemProp="startDate" content={`${item.year}-01-01`} />
                    <meta itemProp="name" content={item.title} />
                    <p className="text-[rgb(45,56,106)] text-sm font-semibold" itemProp="keywords">
                      {item.year}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2" itemProp="alternateName">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-10">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-xl shadow-sm"
              itemScope
              itemType="https://schema.org/Event"
            >
              <div 
                className="w-10 h-10 mb-4 rounded-full bg-white border-2 border-[rgb(45,56,106)] shadow flex items-center justify-center"
                itemProp="location"
                itemScope
                itemType="https://schema.org/Place"
              >
                <meta itemProp="name" content="Alfa Business Center Borivali" />
                {item.icon}
              </div>
              <meta itemProp="startDate" content={`${item.year}-01-01`} />
              <meta itemProp="name" content={item.title} />
              <p className="text-[rgb(45,56,106)] text-sm font-semibold" itemProp="keywords">
                {item.year}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2" itemProp="alternateName">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed" itemProp="description">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Hidden SEO Content */}
        <div className="sr-only" aria-hidden="true">
          <h3>Alfa Business Center Journey Timeline - Coworking Space Borivali Mumbai</h3>
          <p>
            Alfa Business Center began its journey in 2020 with a vision to transform the workspace 
            landscape in Borivali, Mumbai. Our timeline showcases key milestones in becoming 
            Borivali's premier coworking destination.
          </p>
          <ul>
            <li><strong>2020:</strong> Foundation - Established as Borivali's first premium coworking space</li>
            <li><strong>2021:</strong> Expansion - Added private offices and enhanced facilities</li>
            <li><strong>2022:</strong> Growth - Achieved 95% occupancy with 200+ professionals</li>
            <li><strong>2023:</strong> Community - Introduced wellness programs and networking events</li>
            <li><strong>2024:</strong> Innovation - Launched virtual office and digital solutions</li>
          </ul>
          <p>
            Throughout our journey, Alfa Business Center has consistently delivered premium workspace 
            solutions in Borivali Mumbai, catering to the evolving needs of modern professionals, 
            startups, and established businesses.
          </p>
          <p>
            <strong>Key Achievements:</strong>
          </p>
          <ul>
            <li>Pioneered coworking concept in Borivali West</li>
            <li>Served 500+ professionals across Mumbai</li>
            <li>Maintained 95% occupancy rate consistently</li>
            <li>Expanded to virtual office solutions</li>
            <li>Built strong business community network</li>
          </ul>
          <p>
            Keywords: alfa business center journey timeline, coworking space growth borivali, 
            office space evolution mumbai, business center milestones, workspace transformation story, 
            premium coworking borivali history, virtual office launch mumbai
          </p>
        </div>
      </div>
    </section>
  );
}