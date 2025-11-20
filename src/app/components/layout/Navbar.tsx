"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Plans", href: "/plans" },
  { label: "Amenities", href: "/amenities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const isActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.includes(href);
  };

  // Structured Data for Organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alfa Business Center",
    "description": "Premium coworking space in Borivali Mumbai offering flexible workspace solutions, private cabins, meeting rooms and virtual offices",
    "url": "https://weworkoffice.in",
    "logo": "https://weworkoffice.in/Logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400092",
      "addressCountry": "IN"
    },
    "telephone": "+91-98201-90836",
    "email": "info@alfaesol.com",
    "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
    "sameAs": [
      "https://twitter.com/alphabusinessc6",
      "https://www.facebook.com/Alfa-Business-Center-100864201496641/",
      "https://www.instagram.com/alfa_business_centre/"
    ]
  };

  return (
    <nav
      className={`w-full z-50 top-0 fixed bg-white transition-all duration-300 border-b border-gray-200 ${isSticky ? "shadow-md" : ""
        }`}
      role="navigation"
      aria-label="Main navigation"
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
      
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            aria-label="Alfa Business Center Homepage - Premium Coworking Space Borivali Mumbai"
            itemProp="url"
          >
            <Image
              src="/Logo.jpg"
              alt="Alfa Business Center Logo - Premium Coworking Space Borivali Mumbai"
              width={90}
              height={50}
              className="object-contain"
              priority
              itemProp="logo"
            />
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div 
          className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2"
          role="menubar"
          aria-label="Primary navigation menu"
        >
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`font-medium transition ${isActive(href)
                ? "text-[rgb(45,56,106)] font-semibold"
                : "text-black hover:text-[rgb(45,56,106)]"
                }`}
              role="menuitem"
              aria-current={isActive(href) ? "page" : undefined}
              itemProp="url"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden md:flex">
          <Link
            href="/tour"
            className="flex items-center gap-2 bg-[rgb(45,56,106)] text-white px-4 py-2 rounded-md shadow hover:bg-[rgb(35,45,90)] transition"
            aria-label="Book a tour of Alfa Business Center Coworking Space Borivali Mumbai"
            role="button"
          >
            Book a Tour
            {/* <ArrowUpRight size={16} /> */}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        role="menu"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col items-start px-4 py-3 gap-4 bg-white border-t">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`w-full text-left font-medium ${isActive(href)
                ? "text-[rgb(45,56,106)] font-semibold"
                : "text-gray-700 hover:text-[rgb(45,56,106)]"
                }`}
              onClick={() => setMobileOpen(false)}
              role="menuitem"
              aria-current={isActive(href) ? "page" : undefined}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/tour"
            className="flex items-center gap-2 mt-2 bg-[rgb(45,56,106)] text-white px-4 py-2 rounded-md shadow hover:bg-[rgb(35,45,90)] transition"
            onClick={() => setMobileOpen(false)}
            role="button"
            aria-label="Book a tour of Alfa Business Center Coworking Space Borivali Mumbai"
            tabIndex={mobileOpen ? 0 : -1}
          >
            Book a Tour
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Alfa Business Center - Premium Coworking Space Borivali Mumbai</h1>
        <p>
          Alfa Business Center is a premium coworking space located in Borivali West, Mumbai offering 
          flexible workspace solutions including private cabins, dedicated desks, hot desks, meeting rooms, 
          and virtual office services.
        </p>
        
        <h2>Navigation Menu</h2>
        <p>
          Main navigation for Alfa Business Center website including Home, About Us, Plans & Pricing, 
          Amenities, Gallery, Contact, and Book a Tour options.
        </p>

        <h3>Quick Navigation Links:</h3>
        <ul>
          <li><strong>Home:</strong> Landing page for Alfa Business Center coworking space</li>
          <li><strong>About Us:</strong> Company story, mission, and team information</li>
          <li><strong>Plans:</strong> Coworking membership plans and pricing options</li>
          <li><strong>Amenities:</strong> Facilities and services available at our Borivali location</li>
          <li><strong>Gallery:</strong> Photos and virtual tour of our workspace</li>
          <li><strong>Contact:</strong> Contact information and inquiry form</li>
          <li><strong>Book a Tour:</strong> Schedule a visit to our Borivali coworking space</li>
        </ul>

        <p>
          Keywords: alfa business center navigation, coworking space menu borivali, office space website links, 
          business center navigation menu, borivali coworking website, mumbai workspace navigation, 
          premium coworking borivali menu, website navigation structure
        </p>

        <p>
          <strong>Location Information:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), 
          next to McDonald, Mumbai, Maharashtra 400092 | Phone: +91-98201-90836 | Email: info@alfaesol.com
        </p>
      </div>
    </nav>
  );
};

export default Navbar;