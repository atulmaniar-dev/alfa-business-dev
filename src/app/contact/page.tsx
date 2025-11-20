'use client';
import { useState } from 'react';
import { Mail, MapPin, Phone } from "lucide-react";
import ContactBanner from "../components/reusable/ContactBanner";
import ReCaptchaV3 from '../components/reusable/ReCaptchaV3';

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic form validation
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Verify reCAPTCHA first
    try {
      const captchaResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const captchaData = await captchaResponse.json();

      if (!captchaData.success) {
        throw new Error('CAPTCHA verification failed. Please try again.');
      }

      // If CAPTCHA is valid, submit the form
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Message sent successfully!');
        setForm({ name: '', email: '', number: '', message: '' });
        setRecaptchaToken(''); // Reset token after successful submission
      } else {
        throw new Error(data.error?.[0]?.message || data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Error submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured Data for Contact Page
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Alfa Business Center - Coworking Space Borivali Mumbai",
    "description": "Get in touch with Alfa Business Center for premium coworking spaces, private cabins, meeting rooms and virtual office solutions in Borivali Mumbai",
    "url": "https://weworkoffice.in/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Alfa Business Center",
      "description": "Premium coworking space in Borivali Mumbai offering flexible workspace solutions",
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
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.2307",
        "longitude": "72.8567"
      },
      "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98201-90836",
        "email": "info@alfaesol.com",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      }
    }
  };

  return (
    <>
      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />

      <ContactBanner />

      <section 
        className="pt-16 bg-white"
        itemScope
        itemType="https://schema.org/ContactPage"
        aria-label="Contact Alfa Business Center - Coworking Space Borivali Mumbai"
      >
        <meta itemProp="name" content="Contact Alfa Business Center - Premium Coworking Space Borivali Mumbai" />
        <meta itemProp="description" content="Get in touch with Alfa Business Center for coworking spaces, private offices, meeting rooms and virtual office solutions in Borivali West Mumbai" />
        
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="border border-gray-300 rounded-xl shadow-sm p-6 sm:p-8 md:p-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left: Contact Form */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2d386a] mb-2">
                  Contact Alfa Business Center - Coworking Space Borivali Mumbai
                </h1>
                <p className="text-gray-600 mb-6">
                  Get in touch with us for premium coworking spaces, private cabins, meeting rooms 
                  and virtual office solutions in Borivali West, Mumbai.
                </p>
                
                <form 
                  className="space-y-5" 
                  onSubmit={handleSubmit}
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <meta itemProp="email" content="info@alfaesol.com" />
                  <meta itemProp="telephone" content="+91-98201-90836" />
                  <meta itemProp="areaServed" content="Borivali Mumbai" />
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                      aria-required="true"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                      aria-required="true"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="number" className="block text-sm font-medium text-black">
                      Phone Number
                    </label>
                    <input
                      id="number"
                      type="tel"
                      name="number"
                      value={form.number}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-black">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your workspace requirements, preferred plan, or schedule a tour of our Borivali coworking space"
                      required
                      className="w-full border border-gray-300 h-24 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                      aria-required="true"
                    />
                  </div>

                  {/* reCAPTCHA v3 - invisible */}
                  <ReCaptchaV3 onVerify={handleRecaptchaVerify} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2 cursor-pointer bg-[#2d386a] text-white px-6 py-2 rounded-md hover:bg-[#1f2a4e] transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    aria-label={isSubmitting ? 'Sending your message' : 'Send message to Alfa Business Center'}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <span className="text-xl">→</span>}
                  </button>

                  <p className="text-xs text-gray-500">
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy" className="text-blue-500 hover:underline ml-1">
                      Privacy Policy
                    </a> and
                    <a href="https://policies.google.com/terms" className="text-blue-500 hover:underline ml-1">
                      Terms of Service
                    </a> apply.
                  </p>
                </form>
              </div>

              {/* Right: Map & Info */}
              <div 
                className="space-y-6"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <div className="rounded-lg overflow-hidden h-64 border border-gray-300">
                  <iframe
                    src="https://maps.google.com/maps?q=Alfa%20Business%20Center,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    title="Alfa Business Center Location Map - Coworking Space Borivali Mumbai"
                    aria-label="Interactive map showing Alfa Business Center location in Borivali West Mumbai"
                  ></iframe>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-black mb-3">
                    Visit Our Coworking Space in Borivali Mumbai
                  </h2>
                  <ul className="space-y-4 text-sm text-black">
                    {/* Address → Google Maps Link */}
                    <li className="flex items-start gap-3">
                      <MapPin className="text-[#2d386a] w-5 h-5 mt-0.5" />
                      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <a
                          href="https://maps.google.com/?q=Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          itemProp="streetAddress"
                        >
                          Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, 
                          <span itemProp="addressLocality"> Mumbai</span>, 
                          <span itemProp="addressRegion"> Maharashtra</span>
                          <span itemProp="postalCode"> 400092</span>
                        </a>
                      </div>
                    </li>

                    {/* Phone → Click to Call */}
                    <li className="flex items-center gap-3">
                      <Phone className="text-[#2d386a] w-5 h-5" />
                      <a
                        href="tel:+919820190836"
                        className="hover:underline"
                        itemProp="telephone"
                      >
                        +91 98201 90836
                      </a>
                    </li>

                    {/* Email → Click to Mail */}
                    <li className="flex items-center gap-3">
                      <Mail className="text-[#2d386a] w-5 h-5" />
                      <a
                        href="mailto:info@alfaesol.com"
                        className="hover:underline"
                        itemProp="email"
                      >
                        info@alfaesol.com
                      </a>
                    </li>
                  </ul>

                  {/* Business Hours */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-black mb-2">Business Hours</h3>
                    <ul className="text-sm text-black space-y-1">
                      <li className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday:</span>
                        <span>9:00 AM - 2:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden SEO Content for Search Engines */}
        <div className="sr-only" aria-hidden="true">
          <h2>Contact Alfa Business Center - Premium Coworking Space Borivali Mumbai</h2>
          <p>
            Get in touch with Alfa Business Center, the premier coworking space in Borivali West, Mumbai. 
            We offer flexible workspace solutions including private cabins, dedicated desks, hot desks, 
            meeting rooms, and virtual office services.
          </p>
          
          <h3>Why Contact Alfa Business Center?</h3>
          <p>
            Located in the heart of Borivali West at Dattani Tower, Kore Kendra, Alfa Business Center 
            provides professionals, startups, and enterprises with premium workspace solutions. 
            Our modern facilities and strategic location make us the ideal choice for businesses in Mumbai.
          </p>

          <h3>Our Coworking Solutions:</h3>
          <ul>
            <li><strong>Private Cabins:</strong> Fully enclosed offices for teams of 2-10 people</li>
            <li><strong>Dedicated Desks:</strong> Personal workspace with storage facilities</li>
            <li><strong>Hot Desks:</strong> Flexible seating in shared workspace areas</li>
            <li><strong>Meeting Rooms:</strong> Hourly and daily rental of professional meeting spaces</li>
            <li><strong>Virtual Offices:</strong> Premium business address with mail handling services</li>
            <li><strong>Day Passes:</strong> Flexible daily workspace access</li>
          </ul>

          <h3>Location & Accessibility:</h3>
          <p>
            Our Borivali coworking space is strategically located next to McDonald's in Borivali West, 
            providing excellent connectivity to both western and central Mumbai. Easily accessible via 
            public transportation including Borivali railway station and local bus routes.
          </p>

          <h3>Contact Information:</h3>
          <p>
            <strong>Address:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092<br/>
            <strong>Phone:</strong> +91-98201-90836<br/>
            <strong>Email:</strong> info@alfaesol.com<br/>
            <strong>Business Hours:</strong> Monday-Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM
          </p>

          <h3>Get Started Today:</h3>
          <p>
            Whether you're looking for a private office, flexible coworking space, meeting room rental, 
            or virtual office solution in Borivali Mumbai, our team is ready to assist you. 
            Contact us to schedule a tour, discuss your requirements, or get pricing information.
          </p>

          <p>
            Keywords: contact alfa business center borivali, coworking space contact mumbai, 
            office space inquiry borivali west, business center phone number, virtual office contact, 
            meeting room booking borivali, private cabin inquiry mumbai, workspace solutions contact, 
            alfa business center email, borivali coworking space phone number
          </p>

          <p>
            <strong>Additional Contact Methods:</strong> WhatsApp business messaging, in-person consultations, 
            virtual tours, customized workspace solutions, corporate package inquiries, startup special offers
          </p>
        </div>
      </section>
    </>
  );
}