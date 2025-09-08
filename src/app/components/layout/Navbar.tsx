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

  return (
    <nav
      className={`w-full z-50 top-0 fixed bg-white transition-all duration-300 border-b border-gray-200 ${isSticky ? "shadow-md" : ""
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/Logo.jpg"
            alt="Alfa Logo"
            width={90}
            height={50}
            className="object-contain"
            priority
          />
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`font-medium transition ${isActive(href)
                ? "text-[rgb(45,56,106)] font-semibold"
                : "text-black hover:text-[rgb(45,56,106)]"
                }`}
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
          >
            Book a Tour
            {/* <ArrowUpRight size={16} /> */}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[500px]" : "max-h-0"
          }`}
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
            >
              {label}
            </Link>
          ))}
          <Link
            href="#book-tour"
            className="flex items-center gap-2 mt-2 bg-[rgb(45,56,106)] text-white px-4 py-2 rounded-md shadow hover:bg-[rgb(35,45,90)] transition"
            onClick={() => setMobileOpen(false)}
          >
            Book a Tour
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
