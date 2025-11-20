'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'What are your operating hours at Alfa Business Center Borivali?',
    answer: 'Alfa Business Center Borivali operates from 9:00 AM to 8:00 PM. We provide 24/7 access for members with minimum 10 coworkers, ensuring flexible workspace solutions in Mumbai.',
  },
  {
    question: 'Do you work on Sundays at your Borivali coworking space?',
    answer: 'Yes, Alfa Business Center in Borivali West is open on Sundays from 9:00 AM to 8:00 PM, providing weekend workspace solutions for professionals in Mumbai.',
  },
  {
    question: 'Are pets allowed in the Borivali coworking space?',
    answer: 'No, pets are not permitted at Alfa Business Center Borivali to maintain a professional and allergen-free environment for all our members in Mumbai.',
  },
  {
    question: 'Is high-speed internet included in your Borivali coworking plans?',
    answer: 'Yes, high-speed fiber internet is included with all coworking plans at Alfa Business Center Borivali. Enjoy reliable WiFi connectivity throughout our Mumbai workspace.',
  },
  {
    question: 'Do you have other coworking locations besides Borivali Mumbai?',
    answer: 'Currently, our premium coworking space is located in Borivali West, Mumbai. We are planning expansion to other locations to serve more professionals across Mumbai.',
  },
  {
    question: 'How do I get started with coworking at Alfa Business Center Borivali?',
    answer: 'You can start your coworking journey at Alfa Business Center Borivali by booking a tour or registering directly. Contact us for flexible workspace solutions in Mumbai.',
  },
];

// Structured Data for FAQ Page
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq, index) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    },
    "position": index + 1
  }))
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div 
      className="mt-20"
      itemScope
      itemType="https://schema.org/FAQPage"
      aria-label="Frequently Asked Questions - Alfa Business Center Coworking Space Borivali Mumbai"
    >
      
      {/* Structured Data for FAQ Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <h2 className="text-3xl font-bold text-[#1e2952] mb-10 text-center">
        Frequently Asked Questions - Coworking Space Borivali Mumbai
      </h2>

      <div className="flex flex-wrap gap-6 items-start text-left">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`w-full md:w-[48%] rounded-2xl border transition-all duration-300 
              ${openIndex === idx ? 'border-[#1e2952]' : 'border-gray-200'}
            `}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => toggle(idx)}
              className="flex items-center justify-between w-full px-6 py-3 text-left 
                         hover:bg-gray-50 rounded-2xl transition-colors"
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              itemProp="name"
            >
              <span className="font-semibold text-[#1e2952] text-lg">
                {faq.question}
              </span>
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-[#1e2952]" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#1e2952]" aria-hidden="true" />
              )}
            </button>

            <div
              id={`faq-answer-${idx}`}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div className="px-6 pb-5 text-sm text-gray-700 leading-relaxed" itemProp="text">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h3>Comprehensive FAQ - Alfa Business Center Coworking Space Borivali Mumbai</h3>
        <p>
          Find answers to common questions about Alfa Business Center, the premier coworking space 
          in Borivali Mumbai. Learn about our operating hours, amenities, policies, and workspace solutions.
        </p>
        
        <h4>Coworking Space Operating Hours & Access</h4>
        <p>
          Alfa Business Center in Borivali West operates from 9:00 AM to 8:00 PM daily, including 
          weekends. We offer 24/7 access for teams with minimum 10 members, providing flexible 
          workspace solutions for Mumbai professionals.
        </p>

        <h4>Workspace Amenities & Facilities</h4>
        <p>
          Our Borivali coworking space includes high-speed internet, meeting rooms, private cabins, 
          hot desks, and virtual office solutions. We maintain a professional environment suitable 
          for businesses of all sizes.
        </p>

        <h4>Location & Accessibility</h4>
        <p>
          Located in Dattani Tower, Kore Kendra, Borivali West, our coworking space is easily 
          accessible from all parts of Mumbai. We're situated next to McDonald's for convenient 
          access to amenities.
        </p>

        <h4>Membership & Registration Process</h4>
        <p>
          Starting your coworking journey at Alfa Business Center Borivali is simple. Book a tour, 
          choose your plan, and register. We offer flexible terms to suit your business needs in Mumbai.
        </p>

        <p>
          <strong>Common Search Terms:</strong> coworking space borivali faq, office space mumbai questions, 
          alfa business center queries, shared workspace borivali information, virtual office mumbai help, 
          meeting room rental borivali, private cabin borivali pricing, hot desk borivali availability
        </p>

        <p>
          Keywords: faq coworking space borivali, alfa business center questions, office space mumbai queries, 
          shared workspace borivali help, virtual office faq, meeting room rental questions, 
          private cabin borivali information, hot desk mumbai answers, business center borivali support
        </p>
      </div>
    </div>
  );
}