import AboutStorySection from "@/app/components/AboutUsComponents/AboutStorySection";
import OurMissionSection from "../components/AboutUsComponents/OurMissionSection";
import WhyChooseSection from "../components/landing/WhyChooseSection";
import OurJourneySection from "../components/AboutUsComponents/OurJourneySection";
import TrustedBySection from "../components/AboutUsComponents/TrustedBySection";

// About Page Metadata
export const metadata = {
  title: 'About Alfa Business Center - Premium Coworking Space in Borivali Mumbai',
  description: 'Discover the story behind Alfa Business Center - leading coworking space in Borivali Mumbai. Learn about our mission, journey, and commitment to providing premium workspace solutions for professionals.',
  keywords: [
    'about alfa business center',
    'coworking space borivali story',
    'office space mumbai about us',
    'business center mission',
    'alfa business center journey',
    'why choose us borivali',
    'trusted coworking space mumbai'
  ],
  openGraph: {
    title: 'About Alfa Business Center - Premium Coworking Space in Borivali Mumbai',
    description: 'Discover the story behind Alfa Business Center - leading coworking space in Borivali Mumbai',
    url: 'https://weworkoffice.in/about',
    siteName: 'Alfa Business Center',
    images: [
      {
        url: '/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Alfa Business Center - Coworking Space Borivali Mumbai',
      },
    ],
    type: 'website',
  },
};

export default function AboutPage() {
  // Structured Data for About Page
  const aboutPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Alfa Business Center",
    "description": "Learn about Alfa Business Center - premium coworking space in Borivali Mumbai offering flexible workspace solutions",
    "url": "https://weworkoffice.in/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Alfa Business Center",
      "description": "Premium coworking space in Borivali, Mumbai",
      "url": "https://weworkoffice.in",
      "telephone": "+91-98201-90836",
      "email": "info@alfaesol.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400092",
        "addressCountry": "IN"
      },
      "founder": {
        "@type": "Person",
        "name": "Alfa Business Center Team"
      },
      "foundingDate": "2020",
      "numberOfEmployees": "10-50",
      "slogan": "Premium Coworking Space in Borivali Mumbai",
      "knowsAbout": [
        "Coworking Space Management",
        "Office Space Solutions",
        "Business Center Operations",
        "Workspace Amenities",
        "Professional Environment"
      ]
    }
  };

  return (
    <>
      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageStructuredData) }}
      />
      
      <main className="bg-white" itemScope itemType="https://schema.org/AboutPage">
        <meta itemProp="name" content="About Alfa Business Center" />
        <meta itemProp="description" content="Learn about Alfa Business Center - premium coworking space in Borivali Mumbai offering flexible workspace solutions for professionals" />
        
        <AboutStorySection />
        <OurMissionSection />
        <WhyChooseSection />
        <OurJourneySection />
        <TrustedBySection />

        {/* Hidden SEO content for search engines */}
        <div className="sr-only" aria-hidden="true">
          <h1>About Alfa Business Center - Premium Coworking Space in Borivali Mumbai</h1>
          <p>
            Alfa Business Center is a premier coworking space located in the heart of Borivali West, Mumbai. 
            Established with a vision to revolutionize workspace solutions, we provide professionals, 
            startups, and enterprises with flexible, modern, and productive work environments.
          </p>
          <p>
            Our journey began with a simple mission: to create workspace solutions that adapt to the 
            evolving needs of Mumbai's dynamic business community. Located in Dattani Tower, Kore Kendra, 
            Borivali West, we've become the preferred choice for professionals seeking premium coworking 
            facilities in Mumbai.
          </p>
          <p>
            <strong>Our Story:</strong> From humble beginnings to becoming Borivali's leading business center
          </p>
          <p>
            <strong>Our Mission:</strong> To provide flexible, premium workspace solutions that empower businesses
          </p>
          <p>
            <strong>Our Journey:</strong> Years of growth and commitment to excellence in workspace solutions
          </p>
          <p>
            <strong>Why Choose Us:</strong> Modern amenities, prime location, and professional environment
          </p>
          <p>
            <strong>Trusted By:</strong> 100+ companies and professionals across Mumbai
          </p>
          <p>
            At Alfa Business Center, we believe that the right workspace can transform productivity and 
            drive business growth. Our facilities in Borivali are designed to meet the diverse needs of 
            modern professionals, offering everything from hot desks and private cabins to meeting rooms 
            and virtual office solutions.
          </p>
          <p>
            Keywords: about alfa business center borivali, coworking space story mumbai, 
            business center mission statement, office space journey, why choose our workspace, 
            trusted by professionals, premium coworking borivali west
          </p>
        </div>
      </main>
    </>
  );
}