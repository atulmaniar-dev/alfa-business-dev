'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'What are your hours?',
    answer:
      'Alfa Business Center is working from 9.00am to 8.00pm. We are open to provide access 24/7 subject to minimum of 10 Co-workers',
  },
  {
    question: 'Do you work on Sunday?',
    answer: 'Yes, Alfa Business Center works on Sunday from 9am to 8pm',
  },
  {
    question: 'Do you allow pets?',
    answer: 'No, the pets ain’t allowed at Alfa Business Center.',
  },
  {
    question: 'Is internet included?',
    answer: 'Yes, the internet is included at Alfa Business Center via Wifi.',
  },
  {
    question: 'What about your other locations?',
    answer: 'Mentioned location is the only one but we are planning for other location also.',
  },
  {
    question: 'How do I get started?',
    answer: 'You can start at Alfa Business Center either by book a tour or by getting registered with us.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-[#1e2952] mb-10 text-center">
        Frequently Asked Questions
      </h2>

      {/* ✅ Flex wrap so each item has independent height */}
      <div className="flex flex-wrap gap-6 items-start text-left">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`w-full md:w-[48%] rounded-2xl border transition-all duration-300 
              ${openIndex === idx ? 'border-[#1e2952]' : 'border-gray-200'}
            `}
          >
            <button
              onClick={() => toggle(idx)}
              className="flex items-center justify-between w-full px-6 py-3 text-left 
                         hover:bg-gray-50 rounded-2xl transition-colors"
            >
              <span className="font-semibold text-[#1e2952] text-lg">{faq.question}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-[#1e2952]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#1e2952]" />
              )}
            </button>

            {/* ✅ Smooth expand/collapse */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 text-sm text-gray-700 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
