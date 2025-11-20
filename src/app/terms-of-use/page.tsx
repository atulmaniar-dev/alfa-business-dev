'use client';
import React from 'react';

export default function TermsOfUse() {
  // Structured Data for Terms of Use
  const termsOfUseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Use - Alfa Business Center Coworking Space Borivali Mumbai",
    "description": "Terms of Use for Alfa Business Center - Premium coworking space in Borivali Mumbai. Read our terms for website usage, service agreements, and membership policies.",
    "url": "https://weworkoffice.in/terms-of-use",
    "mainEntity": {
      "@type": "LegalService",
      "name": "Terms of Use",
      "description": "Comprehensive terms and conditions for using Alfa Business Center website and coworking services in Borivali Mumbai",
      "provider": {
        "@type": "Organization",
        "name": "Alfa Business Center",
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
        }
      },
      "termsOfService": "https://weworkoffice.in/terms-of-use",
      "areaServed": "Borivali Mumbai"
    }
  };

  return (
    <div 
      className="min-h-screen bg-white px-4 py-10 md:px-16"
      itemScope
      itemType="https://schema.org/LegalService"
      aria-label="Terms of Use - Alfa Business Center Coworking Space Borivali Mumbai"
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsOfUseStructuredData) }}
      />

      {/* Meta Information */}
      <meta itemProp="name" content="Terms of Use - Alfa Business Center Coworking Space Borivali Mumbai" />
      <meta itemProp="description" content="Read the complete Terms of Use for Alfa Business Center coworking space services, website usage, booking policies, and membership terms in Borivali Mumbai" />
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 
          className="text-3xl md:text-4xl font-bold text-[#2d386a] mb-2"
          itemProp="headline"
        >
          Terms of Use - Alfa Business Center Coworking Space Borivali Mumbai
        </h1>
        <p 
          className="text-gray-600 text-sm max-w-2xl mx-auto"
          itemProp="description"
        >
          Comprehensive Terms of Use governing your access to Alfa Business Center website, coworking services, 
          booking systems, and membership agreements for our Borivali Mumbai location.
        </p>
      </div>

      {/* Content Card */}
      <div 
        className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 text-gray-700 space-y-6 text-sm md:text-base leading-relaxed"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        
        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">1. Acceptance of Terms</h2>
          <p itemProp="text">
            By accessing or using our Alfa Business Center website, booking our coworking services in Borivali Mumbai, 
            or utilizing our facilities, you agree to be bound by these Terms of Use and all applicable laws and regulations 
            governing workspace services in India.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">2. Use of Coworking Services</h2>
          <p itemProp="text">
            Our premium coworking services at Alfa Business Center Borivali are intended for professional, legal, 
            and business-related activities only. Users are expected to maintain professional behavior, respect shared 
            spaces and resources, and adhere to community guidelines while using our Borivali West facilities.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">3. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1" itemProp="text">
            <li>You must provide accurate and complete information when booking tours, registering for memberships, or using our Borivali coworking facilities</li>
            <li>You agree not to misuse, duplicate, or exploit any part of our website, booking system, or coworking services</li>
            <li>You are responsible for securing your personal login details and account information for our member portal</li>
            <li>You must comply with all security protocols and access procedures at our Borivali location</li>
          </ul>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">4. Payments & Billing</h2>
          <p itemProp="text">
            All payments made for coworking services, meeting room bookings, private cabins, and virtual office services 
            at Alfa Business Center Borivali are subject to our current pricing policies. Any disputes or concerns related 
            to payments should be addressed promptly by contacting our support team at <strong>info@alfaesol.com</strong> 
            or calling our Borivali office at <strong>+91 98201 90836</strong>.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">5. Cancellation & Refund Policy</h2>
          <p itemProp="text">
            Booking cancellations for meeting rooms, tours, and coworking memberships must be made within the specified 
            timeframe outlined in your service agreement. Refunds, if applicable, will be processed in accordance with 
            our refund policy mentioned on the respective service page or as communicated directly for our Borivali 
            coworking services.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">6. Intellectual Property Rights</h2>
          <p itemProp="text">
            All content on the Alfa Business Center website including text, graphics, logos, images, and service 
            descriptions are the exclusive property of Alfa Business Center or licensed for our use. Reproduction, 
            redistribution, or commercial use of any website content or proprietary information about our Borivali 
            coworking operations is strictly prohibited without prior written consent.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">7. Modifications to Terms</h2>
          <p itemProp="text">
            We reserve the right to modify these Terms of Use at any time to reflect changes in our services, 
            legal requirements, or business operations at Alfa Business Center Borivali. Updated terms will be 
            posted on this page, and continued use of our website or services constitutes your acceptance of 
            any changes to our terms and conditions.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">8. Limitation of Liability</h2>
          <p itemProp="text">
            Alfa Business Center shall not be liable for any indirect, incidental, special, or consequential 
            damages arising out of or in connection with the use of our website, booking systems, or coworking 
            services at our Borivali Mumbai location, including but not limited to loss of profits, data, or 
            business opportunities.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">9. Governing Law & Jurisdiction</h2>
          <p itemProp="text">
            These Terms of Use are governed by and construed in accordance with the laws of India. Any disputes 
            arising from your use of Alfa Business Center services shall be subject to the exclusive jurisdiction 
            of the courts in Mumbai, Maharashtra, India.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/ContactPoint">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">10. Contact Information</h2>
          <p itemProp="description">For questions regarding these Terms of Use or our coworking services in Borivali Mumbai, please contact:</p>
          <div className="mt-2 space-y-1" itemProp="text">
            <p><strong>Email:</strong> <span itemProp="email">info@alfaesol.com</span></p>
            <p><strong>Phone:</strong> <span itemProp="telephone">+91 98201 90836</span></p>
            <p><strong>Address:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092</p>
            <p><strong>Business Hours:</strong> Monday-Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM</p>
          </div>
        </section>
      </div>

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Comprehensive Terms of Use - Alfa Business Center Coworking Space Borivali Mumbai</h2>
        <p>
          These Terms of Use govern your access to and use of Alfa Business Center's website, booking systems, 
          and coworking services at our Borivali West location in Mumbai. Please read these terms carefully 
          before using our services.
        </p>
        
        <h3>Service Usage Guidelines</h3>
        <p>
          Our terms outline the proper use of Alfa Business Center's coworking facilities, including private cabins, 
          dedicated desks, meeting rooms, and virtual office services in Borivali Mumbai. Users must comply with 
          professional standards and community guidelines while utilizing our workspace solutions.
        </p>

        <h3>Booking and Payment Terms</h3>
        <p>
          All bookings for coworking spaces, meeting rooms, and tours at our Borivali location are subject to 
          availability and payment terms. We offer transparent pricing and flexible membership options with 
          clear cancellation and refund policies.
        </p>

        <h3>User Responsibilities and Conduct</h3>
        <p>
          Members and visitors of Alfa Business Center Borivali are expected to maintain professional conduct, 
          respect shared facilities, and adhere to security protocols. Any misuse of facilities or violation of 
          terms may result in termination of services.
        </p>

        <h3>Legal Compliance</h3>
        <p>
          These terms are designed to ensure compliance with Indian laws and regulations governing coworking spaces 
          and business centers. Alfa Business Center operates in accordance with all applicable legal requirements 
          for our Mumbai operations.
        </p>

        <h3>Updates and Modifications</h3>
        <p>
          We regularly review and update our terms to reflect changes in services, legal requirements, and 
          business operations. Users will be notified of significant changes to terms affecting our Borivali 
          coworking services.
        </p>

        <p>
          Keywords: terms of use alfa business center, coworking space terms borivali, service agreement mumbai, 
          website usage terms, booking conditions, membership terms, legal terms workspace, borivali coworking agreement, 
          alfa business center conditions, terms and conditions mumbai
        </p>

        <p>
          <strong>Terms of Use Related Terms:</strong> service usage agreement, payment terms coworking, 
          cancellation policy borivali, intellectual property rights, liability limitation, governing law india, 
          jurisdiction mumbai, user responsibilities, modification of terms, contact information business center
        </p>

        <h3>About Alfa Business Center Services</h3>
        <p>
          Alfa Business Center provides premium coworking solutions in Borivali West, Mumbai including private offices, 
          dedicated desks, flexible workspaces, meeting rooms, and virtual office services. Our terms ensure a professional 
          and secure environment for all members and visitors.
        </p>

        <p>
          <strong>Services Covered:</strong> Coworking Memberships, Private Cabin Rentals, Meeting Room Bookings, 
          Virtual Office Services, Day Passes, Tour Bookings, Online Payments<br/>
          <strong>Location:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), Mumbai<br/>
          <strong>Contact:</strong> +91-98201-90836 | info@alfaesol.com<br/>
          <strong>Legal Jurisdiction:</strong> Mumbai, Maharashtra, India
        </p>

        <p>
          For specific questions about our terms or services at Alfa Business Center Borivali Mumbai, 
          please contact our team during business hours for clarification and assistance.
        </p>
      </div>
    </div>
  );
}