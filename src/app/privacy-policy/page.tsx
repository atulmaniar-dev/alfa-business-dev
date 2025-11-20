'use client';
import React from 'react';

export default function PrivacyPolicy() {
  // Structured Data for Privacy Policy
  const privacyPolicyStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Alfa Business Center Coworking Space Borivali Mumbai",
    "description": "Privacy Policy for Alfa Business Center - Premium coworking space in Borivali Mumbai. Learn how we collect, use, and protect your personal information.",
    "url": "https://weworkoffice.in/privacy-policy",
    "mainEntity": {
      "@type": "PrivacyPolicy",
      "name": "Privacy Policy",
      "description": "Comprehensive privacy policy detailing data collection, usage, and protection practices at Alfa Business Center Borivali Mumbai",
      "copyrightNotice": "© 2025 Alfa Business Center. All rights reserved.",
      "publisher": {
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
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-white px-4 py-10 md:px-16"
      itemScope
      itemType="https://schema.org/PrivacyPolicy"
      aria-label="Privacy Policy - Alfa Business Center Coworking Space Borivali Mumbai"
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicyStructuredData) }}
      />

      {/* Meta Information */}
      <meta itemProp="name" content="Privacy Policy - Alfa Business Center Coworking Space Borivali Mumbai" />
      <meta itemProp="description" content="Learn how Alfa Business Center collects, uses, and protects your personal information for coworking space services in Borivali Mumbai" />
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 
          className="text-3xl md:text-4xl font-bold text-[#2d386a] mb-2"
          itemProp="headline"
        >
          Privacy Policy - Alfa Business Center Coworking Space Borivali Mumbai
        </h1>
        <p 
          className="text-gray-600 text-sm max-w-2xl mx-auto"
          itemProp="description"
        >
          Comprehensive Privacy Policy explaining how Alfa Business Center collects, uses, and protects your personal information for coworking space services, tour bookings, and membership management in Borivali Mumbai.
        </p>
      </div>

      {/* Content Card */}
      <div 
        className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm text-gray-700 space-y-6 text-sm md:text-base leading-relaxed"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        
        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">1. Information We Collect</h2>
          <p itemProp="text">
            At Alfa Business Center Borivali Mumbai, we collect personal information such as your name, email address, 
            phone number, business details, and any messages or documents you provide when you contact us, book a tour, 
            make a payment, or register for our coworking space services. This includes information collected through 
            our website forms, phone inquiries, and in-person interactions at our Borivali location.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1" itemProp="text">
            <li>To provide and improve our coworking space services in Borivali Mumbai</li>
            <li>To process payments securely for workspace memberships and meeting room bookings</li>
            <li>To respond to your queries and support requests regarding our facilities</li>
            <li>To send updates, newsletters about workspace availability, or promotional messages (if subscribed)</li>
            <li>To manage your membership and provide access to our Borivali coworking facilities</li>
            <li>To schedule tours and demonstrate our workspace solutions</li>
          </ul>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">3. Data Security</h2>
          <p itemProp="text">
            We implement industry-standard security measures to protect your personal information from unauthorized access, 
            alteration, disclosure, or destruction. This includes encryption, secure servers, and restricted access to 
            personal data for our Borivali coworking space operations.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">4. Sharing Your Data</h2>
          <p itemProp="text">
            We do not sell or rent your personal information. We may share data with trusted third-party service providers 
            who help us operate our business center in Borivali, such as payment gateways, email services, or security 
            providers — only when necessary and with strict confidentiality agreements that protect your privacy.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">5. Cookies & Tracking</h2>
          <p itemProp="text">
            Our website for Alfa Business Center Borivali may use cookies to enhance user experience and analyze traffic. 
            You can control cookie settings via your browser preferences. We use analytics to understand how visitors 
            interact with our coworking space information and improve our services.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">6. Your Rights</h2>
          <p itemProp="text">
            You have the right to access, update, or delete your personal data related to our Borivali coworking services. 
            To make any such requests, please contact us at <strong>info@alfaesol.com</strong>. We will respond to your 
            privacy concerns within reasonable timeframes as per applicable data protection laws.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/Article">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">7. Policy Updates</h2>
          <p itemProp="text">
            This privacy policy may be updated occasionally to reflect changes in our practices or legal requirements. 
            Changes will be posted on this page with a revised effective date. Continued use of our Borivali coworking 
            services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section itemScope itemType="https://schema.org/ContactPoint">
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">8. Contact Us for Privacy Concerns</h2>
          <p itemProp="description">
            If you have any questions regarding this Privacy Policy or our data practices at Alfa Business Center Borivali Mumbai, please contact us:
          </p>
          <div className="mt-2 space-y-1" itemProp="text">
            <p><strong>Email:</strong> <span itemProp="email">info@alfaesol.com</span></p>
            <p><strong>Phone:</strong> <span itemProp="telephone">+91 98201 90836</span></p>
            <p><strong>Address:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092</p>
          </div>
        </section>
      </div>

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Comprehensive Privacy Policy - Alfa Business Center Coworking Space Borivali Mumbai</h2>
        <p>
          Alfa Business Center is committed to protecting your privacy and ensuring the security of your personal information. 
          Our privacy policy outlines how we handle data for our coworking space services in Borivali West, Mumbai.
        </p>
        
        <h3>Data Collection for Coworking Services</h3>
        <p>
          We collect information necessary to provide premium coworking services including private cabins, dedicated desks, 
          meeting room bookings, and virtual office solutions at our Borivali location. This includes contact information, 
          business details, and payment information for service delivery.
        </p>

        <h3>Information Usage</h3>
        <p>
          Your information is used exclusively for providing and improving our coworking space services in Borivali Mumbai, 
          processing payments, managing memberships, scheduling tours, and communicating important updates about our facilities.
        </p>

        <h3>Data Protection Measures</h3>
        <p>
          We employ robust security measures including encryption, access controls, and secure servers to protect your 
          personal and business information. Regular security audits ensure ongoing protection of data related to our 
          Borivali coworking operations.
        </p>

        <h3>Third-Party Services</h3>
        <p>
          We work with trusted partners for payment processing, email communications, and security services. All third-party 
          providers are vetted for compliance with privacy standards and data protection requirements for our Mumbai operations.
        </p>

        <h3>Your Privacy Rights</h3>
        <p>
          As a valued member or visitor of Alfa Business Center Borivali, you have rights to access, correct, or delete 
          your personal information. Contact our privacy team for any data-related requests or concerns about our Borivali 
          coworking space services.
        </p>

        <p>
          Keywords: privacy policy alfa business center, coworking space data protection borivali, data privacy mumbai, 
          information collection policy, personal data security, borivali coworking privacy, alfa business center data policy, 
          privacy terms workspace, data protection policy mumbai, borivali west coworking privacy
        </p>

        <p>
          <strong>Privacy Policy Related Terms:</strong> data collection coworking space, information usage policy borivali, 
          personal data protection mumbai, privacy rights workspace, cookie policy business center, data sharing terms, 
          privacy contact information, policy updates notification, GDPR compliance india, data security measures
        </p>

        <h3>About Alfa Business Center Borivali</h3>
        <p>
          Alfa Business Center is a premium coworking space located in Borivali West, Mumbai offering flexible workspace 
          solutions including private cabins, dedicated desks, hot desks, meeting rooms, and virtual office services. 
          Our commitment to privacy reflects our dedication to providing secure and professional workspace solutions.
        </p>

        <p>
          <strong>Location:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092<br/>
          <strong>Contact:</strong> +91-98201-90836 | info@alfaesol.com<br/>
          <strong>Services:</strong> Coworking Spaces, Private Cabins, Meeting Rooms, Virtual Offices, Dedicated Desks
        </p>
      </div>
    </div>
  );
}