export default function OurMissionSection() {
  // Structured Data for Organization Mission
  const missionStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alfa Business Center",
    "mission": "TO EMPOWER BUSINESSES AND INDIVIDUALS WITH A DYNAMIC, SUPPORTIVE, AND INSPIRING ENVIRONMENT THAT FOSTERS INNOVATION, COLLABORATION, AND GROWTH.",
    "description": "Premium coworking space in Borivali Mumbai providing dynamic workspace solutions for businesses and professionals",
    "url": "https://weworkoffice.in",
    "areaServed": "Borivali, Mumbai, Maharashtra",
    "serviceType": "Coworking Space, Business Center, Office Solutions"
  };

  return (
    <section className="px-4 sm:px-6 md:px-2 lg:px-4 py-16" 
             itemScope 
             itemType="https://schema.org/Organization"
             aria-label="Our Mission - Alfa Business Center Coworking Space Borivali Mumbai">
      
      {/* Structured Data for Organization Mission */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(missionStructuredData) }}
      />

      <div className="bg-gray-100 rounded-3xl max-w-7xl mx-auto text-center px-6 sm:px-10 md:px-16 lg:px-20 py-12">
        <p className="text-sm font-bold text-[rgb(45,56,106)] mb-4" itemProp="department">
          Our Mission at Alfa Business Center Borivali
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug" itemProp="mission">
          &quot; TO EMPOWER BUSINESSES AND <br className="hidden sm:block" />
          INDIVIDUALS WITH A DYNAMIC, <br className="hidden sm:block" />
          SUPPORTIVE, AND INSPIRING ENVIRONMENT <br className="hidden sm:block" />
          THAT FOSTERS INNOVATION, <br className="hidden sm:block" />
          COLLABORATION, AND GROWTH.&quot;
        </h2>

        {/* Mission Context for Better Understanding */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#2d386a] mb-2">For Businesses</h3>
            <p className="text-sm text-gray-600">
              Providing scalable workspace solutions in Borivali that grow with your business needs, from startups to enterprises.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#2d386a] mb-2">For Individuals</h3>
            <p className="text-sm text-gray-600">
              Creating productive environments for freelancers and professionals in Mumbai to thrive and collaborate.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#2d386a] mb-2">Our Commitment</h3>
            <p className="text-sm text-gray-600">
              Delivering premium coworking experiences in Borivali with modern amenities and professional support.
            </p>
          </div>
        </div>

        {/* Location Specific Mission Impact */}
        <div className="mt-8 bg-[#2d386a] text-white rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-3">Our Impact in Borivali Mumbai</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold">500+</div>
              <div className="text-white/80">Professionals Served</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">100+</div>
              <div className="text-white/80">Businesses Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">50+</div>
              <div className="text-white/80">Collaborations Fostered</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Our Mission - Alfa Business Center Borivali Mumbai</h2>
        <p>
          At Alfa Business Center in Borivali, Mumbai, our mission is deeply rooted in empowering 
          businesses and individuals through dynamic, supportive, and inspiring workspace environments. 
          We believe that the right workspace can transform how professionals work, collaborate, and grow.
        </p>
        <p>
          Located in the heart of Borivali West, our business center serves as a catalyst for innovation 
          and collaboration among Mumbai's vibrant business community. We provide more than just office 
          space - we create ecosystems where ideas flourish, partnerships form, and businesses scale.
        </p>
        <p>
          <strong>How We Fulfill Our Mission in Borivali Mumbai:</strong>
        </p>
        <ul>
          <li>Providing flexible coworking spaces that adapt to evolving business needs</li>
          <li>Creating collaborative environments that encourage networking and partnerships</li>
          <li>Offering modern amenities that enhance productivity and comfort</li>
          <li>Supporting startups and established businesses with professional infrastructure</li>
          <li>Building a community of like-minded professionals in Borivali</li>
          <li>Maintaining affordable pricing without compromising on quality and service</li>
        </ul>
        <p>
          Our mission extends beyond providing physical workspace. We are committed to being partners 
          in the growth journey of every business and individual who chooses Alfa Business Center 
          as their workspace solution in Borivali, Mumbai.
        </p>
        <p>
          <strong>Location Impact:</strong> Strategically situated in Dattani Tower, Kore Kendra, 
          Borivali West, we serve professionals from across Mumbai with easy access and premium facilities.
        </p>
        <p>
          Keywords: alfa business center mission borivali, coworking space vision mumbai, 
          business center goals borivali west, workspace empowerment mission, 
          office space collaboration, professional environment growth
        </p>
      </div>
    </section>
  );
}