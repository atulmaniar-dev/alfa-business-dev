import Link from "next/link";
import { Mail } from "lucide-react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      setMessage("Please accept the terms & conditions before subscribing.");
      return;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Subscribed successfully!");
        setEmail('');
        setAgree(false);
      } else {
        setMessage(data?.error || "Something went wrong.");
      }
    } catch (err) {
      console.log(err)
      setMessage("Server error. Please try again.");
    }
  };

  // Structured Data for Organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alfa Business Center",
    "description": "Premium coworking space in Borivali Mumbai offering flexible workspace solutions, private cabins, meeting rooms and virtual offices",
    "url": "https://weworkoffice.in",
    "logo": "https://weworkoffice.in/logo.png",
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
    "telephone": "+91-98201-90836",
    "email": "info@alfaesol.com",
    "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
    "priceRange": "₹₹",
    "sameAs": [
      "https://twitter.com/alphabusinessc6",
      "https://www.facebook.com/Alfa-Business-Center-100864201496641/",
      "https://www.instagram.com/alfa_business_centre/"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Borivali, Mumbai"
    },
    "knowsAbout": [
      "Coworking Space Management",
      "Office Space Solutions",
      "Virtual Office Services",
      "Meeting Room Rentals",
      "Business Center Operations"
    ]
  };

  return (
    <footer 
      className="bg-gray-50 text-black pt-14 pb-10"
      role="contentinfo"
      aria-label="Website Footer - Alfa Business Center Coworking Space Borivali Mumbai"
      itemScope
      itemType="https://schema.org/Organization"
    >
      
      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />

      <meta itemProp="name" content="Alfa Business Center - Premium Coworking Space Borivali Mumbai" />
      <meta itemProp="description" content="Premium coworking space in Borivali Mumbai offering flexible workspace solutions, private cabins, meeting rooms and virtual offices" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Address & Contact Info */}
        <div className="md:col-span-4 space-y-4 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900" itemProp="name">
              Alfa Business Center
            </span>
          </div>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <p itemProp="streetAddress">
              Dattani Tower, Mid Wing, Kore Kendra,<br />
              Borivali (West), next to McDonald,<br />
              <span itemProp="addressLocality">Mumbai</span>,{" "}
              <span itemProp="addressRegion">Maharashtra</span>{" "}
              <span itemProp="postalCode">400092</span>
            </p>
          </div>
          <p>
            Email:{" "}
            <a 
              href="mailto:info@alfaesol.com" 
              className="hover:underline"
              itemProp="email"
            >
              info@alfaesol.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a 
              href="tel:+919820190836" 
              className="hover:underline"
              itemProp="telephone"
            >
              +91 98201 90836
            </a>
          </p>

          {/* Social Media */}
          <div 
            className="flex gap-4 mt-4 text-gray-600 text-lg"
            aria-label="Social media links"
          >
            <a 
              href="https://twitter.com/alphabusinessc6" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
              itemProp="sameAs"
            >
              <FaTwitter className="hover:text-[#2d386a]" />
            </a>
            <a 
              href="https://www.facebook.com/Alfa-Business-Center-100864201496641/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              itemProp="sameAs"
            >
              <FaFacebookF className="hover:text-[#2d386a]" />
            </a>
            <a 
              href="https://www.instagram.com/alfa_business_centre/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              itemProp="sameAs"
            >
              <FaInstagram className="hover:text-[#2d386a]" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="md:col-span-4 text-sm">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 space-y-2">
              <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
              <nav aria-label="Quick links navigation">
                <ul className="space-y-2">
                  <li><Link href="/" itemProp="url">Home</Link></li>
                  <li><Link href="/about" itemProp="url">About Us</Link></li>
                  <li><Link href="/plans" itemProp="url">Pricing & Plans</Link></li>
                  <li><Link href="/amenities" itemProp="url">Our Amenities</Link></li>
                  <li><Link href="/gallery" itemProp="url">Gallery</Link></li>
                  <li><Link href="/payment" itemProp="url">Pay Online</Link></li>
                  <li><Link href="/contact" itemProp="url">Contact Us</Link></li>
                  <li>
                    <Link 
                      href="/admin/login" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Admin login (opens in new tab)"
                    >
                      Admin
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="md:w-1/2 space-y-2">
              <h4 className="font-bold text-gray-900 mb-3">Policies</h4>
              <nav aria-label="Policy links navigation">
                <ul className="space-y-2">
                  <li><Link href="/privacy-policy" itemProp="url">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-use" itemProp="url">Terms of Use</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Subscribe Form - Responsive & Clean */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-bold text-gray-900 mb-2">Stay Updated with Alfa Business Center</h4>
          <form 
            className="flex flex-col gap-3 w-full" 
            onSubmit={handleSubmit}
            aria-label="Newsletter subscription form"
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full">
              <div className="flex items-center w-full bg-white border border-gray-300 rounded sm:rounded-r-none overflow-hidden focus-within:border-[#2d386a] focus-within:border-2 transition-all">
                <div className="flex items-center px-4 text-gray-500">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 text-sm text-gray-700 bg-white outline-none"
                  aria-label="Email address for newsletter subscription"
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-[#2d386a] hover:bg-[#1f2a4f] transition-all rounded sm:rounded-l-none whitespace-nowrap"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>

            <label className="text-xs text-gray-600 flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 cursor-pointer"
                required
                checked={agree}
                onChange={() => {
                  setAgree(!agree);
                  if (message && message.includes("Please accept")) {
                    setMessage("");
                  }
                }}
                aria-required="true"
              />
              <span>
                I have read and agree to the{" "}
                <Link href="/terms-of-use" className="underline text-[#2d386a]">
                  terms & conditions
                </Link>.
              </span>
            </label>

            {/* Show message */}
            {message && (
              <p 
                className={`text-xs mt-1 ${message.includes("Please accept") ? "text-red-600" : "text-green-600"}`}
                role="alert"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Strip */}
      <div 
        className="mt-12 border-t pt-6 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="text-center">
          © 2025 <span itemProp="name">Alfa Business Center</span>. All rights reserved.
        </div>
        <div 
          className="flex gap-4 text-gray-600 text-lg"
          aria-label="Social media links"
        >
          <a
            href="https://twitter.com/alphabusinessc6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Twitter"
            itemProp="sameAs"
          >
            <FaTwitter className="hover:text-[#2d386a]" />
          </a>
          <a
            href="https://www.facebook.com/Alfa-Business-Center-100864201496641/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            itemProp="sameAs"
          >
            <FaFacebookF className="hover:text-[#2d386a]" />
          </a>
          <a
            href="https://www.instagram.com/alfa_business_centre/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            itemProp="sameAs"
          >
            <FaInstagram className="hover:text-[#2d386a]" />
          </a>
        </div>
      </div>

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Alfa Business Center - Premium Coworking Space Borivali Mumbai</h2>
        <p>
          Alfa Business Center is a premium coworking space located in Borivali West, Mumbai offering 
          flexible workspace solutions including private cabins, dedicated desks, hot desks, meeting rooms, 
          and virtual office services.
        </p>
        
        <h3>Contact Information:</h3>
        <p>
          <strong>Address:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092<br/>
          <strong>Phone:</strong> +91-98201-90836<br/>
          <strong>Email:</strong> info@alfaesol.com<br/>
          <strong>Business Hours:</strong> Monday-Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM
        </p>

        <h3>Our Services:</h3>
        <ul>
          <li>Private Cabin Offices for Teams</li>
          <li>Dedicated Desk Workspaces</li>
          <li>Hot Desk & Flexible Seating</li>
          <li>Meeting Room & Conference Room Rentals</li>
          <li>Virtual Office Solutions</li>
          <li>Day Passes & Flexible Memberships</li>
          <li>Business Address Services</li>
        </ul>

        <h3>Location Advantage:</h3>
        <p>
          Strategically located in Borivali West, Mumbai with excellent connectivity to public transportation, 
          restaurants, banks, and essential amenities. Easy access from Borivali railway station and major roads.
        </p>

        <p>
          Keywords: alfa business center borivali, coworking space mumbai, office space borivali west, 
          shared workspace mumbai, business center borivali, virtual office mumbai, meeting rooms borivali, 
          private cabins borivali, dedicated desks mumbai, flexible workspace solutions
        </p>

        <p>
          <strong>Footer Navigation Terms:</strong> about alfa business center, coworking plans pricing, 
          amenities facilities, gallery workspace photos, contact information, privacy policy, terms of use, 
          admin login, online payment
        </p>
      </div>
    </footer>
  );
}