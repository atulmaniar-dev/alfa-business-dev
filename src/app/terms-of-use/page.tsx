'use client';
import React from 'react';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2d386a] mb-2">
          Terms of Use
        </h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Please read these terms carefully before using the Alfa Business Center website or services.
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 text-gray-700 space-y-6 text-sm md:text-base leading-relaxed">
        
        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using our website or services, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">2. Use of Services</h2>
          <p>Our coworking services are intended for professional and lawful use only. Users are expected to maintain appropriate behavior and respect shared spaces and resources.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">3. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You must provide accurate and complete information when booking or registering.</li>
            <li>You agree not to misuse, duplicate, or exploit any part of the website or services.</li>
            <li>You are responsible for securing your personal login details if applicable.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">4. Payments</h2>
          <p>All payments made for coworking services are subject to our pricing policies. Any disputes or concerns related to payments should be addressed by contacting our support team at <strong>payments@alfabusiness.com</strong>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">5. Cancellation & Refunds</h2>
          <p>Booking cancellations must be made within the specified timeframe. Refunds, if applicable, will be processed in accordance with our refund policy mentioned on the respective service page or communicated directly.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">6. Intellectual Property</h2>
          <p>All content on this website including text, graphics, logos, and images are the property of Alfa Business Center or licensed for use. Reproduction or redistribution is prohibited without prior written consent.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">7. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms of Use at any time. Updated terms will be posted on this page, and continued use of the site constitutes your acceptance of any changes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">8. Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising out of the use of our website or services.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">9. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts in Mumbai, Maharashtra.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#2d386a] mb-2">10. Contact</h2>
          <p>If you have questions regarding these Terms of Use, please contact:</p>
          <p className="mt-2">
            <strong>Email:</strong> info@alfaesol.com <br />
            <strong>Phone:</strong> +91 98201 90836
          </p>
        </section>
      </div>
    </div>
  );
}
