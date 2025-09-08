'use client';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2d386a] mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          This Privacy Policy explains how Alfa Business Center collects, uses, and protects your personal information.
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm text-gray-700 space-y-6 text-sm md:text-base leading-relaxed">
        
        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">1. Information We Collect</h2>
          <p>We may collect personal information such as your name, email address, phone number, and any messages or documents you provide when you contact us, book a tour, or make a payment through our platform.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To provide and improve our services</li>
            <li>To process payments securely</li>
            <li>To respond to your queries and support requests</li>
            <li>To send updates, newsletters, or promotional messages (if subscribed)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">3. Data Security</h2>
          <p>We implement industry-standard measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">4. Sharing Your Data</h2>
          <p>We do not sell or rent your personal information. We may share data with trusted third-party service providers who help us operate our business, such as payment gateways or email services — only when necessary and with strict confidentiality agreements.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">5. Cookies & Tracking</h2>
          <p>Our website may use cookies to enhance user experience and analyze traffic. You can control cookie settings via your browser preferences.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">6. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal data. To make any such requests, please contact us at <strong>info@alfaesol.com</strong>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">7. Policy Updates</h2>
          <p>This policy may be updated occasionally. Changes will be posted on this page with a revised effective date.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">8. Contact Us</h2>
          <p>If you have any questions regarding this Privacy Policy, please contact us:</p>
          <p className="mt-2">
            <strong>Email:</strong> info@alfaesol.com <br />
            <strong>Phone:</strong> +91 98201 90836
          </p>
        </section>
      </div>
    </div>
  );
}
