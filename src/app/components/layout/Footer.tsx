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
  return (
    <footer className="bg-gray-50 text-black pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Address & Contact Info */}
        <div className="md:col-span-4 space-y-4 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900">Alfa Business Center</span>
          </div>
          <p>
            Dattani Tower, Mid Wing, Kore Kendra,<br />
            Borivali (West), next to McDonald,<br />
            Mumbai, Maharashtra 400092
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@alfaesol.com" className="hover:underline">
              info@alfaesol.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:9820190836" className="hover:underline">
              98201 90836
            </a>
          </p>



          {/* Social Media */}
          <div className="flex gap-4 mt-4 text-gray-600 text-lg">
            <a href="https://twitter.com/alphabusinessc6" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-[#2d386a]" />
            </a>
            <a href="https://www.facebook.com/Alfa-Business-Center-100864201496641/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-[#2d386a]" />
            </a>
            <a href="https://www.instagram.com/alfa_business_centre/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-[#2d386a]" />
            </a>
          </div>


        </div>

        {/* Links Section */}
        <div className="md:col-span-4 text-sm">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 space-y-2">
              <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/plans">Pricing</Link></li>
                <li><Link href="/amenities">Our Amenities</Link></li>
                <li><Link href="/gallery">Gallery</Link></li>
                <li><Link href="/payment">Pay Online</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/admin/login" target="_blank" rel="noopener noreferrer">
                  Admin
                </Link></li>
              </ul>
            </div>
            <div className="md:w-1/2 space-y-2">
              <h4 className="font-bold text-gray-900 mb-3">Policies</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-use">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>


        {/* Subscribe Form - Responsive & Clean */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-bold text-gray-900 mb-2">Stay Updated</h4>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full">
              <div className="flex items-center w-full bg-white border border-gray-300 rounded sm:rounded-r-none overflow-hidden focus-within:border-[#2d386a] focus-within:border-2 transition-all">
                <div className="flex items-center px-4 text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 text-sm text-gray-700 bg-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-[#2d386a] hover:bg-[#1f2a4f] transition-all rounded sm:rounded-l-none whitespace-nowrap"
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
              <p className={`text-xs mt-1 ${message.includes("Please accept") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}
          </form>

        </div>

      </div>

      {/* Bottom Strip */}
      <div className="mt-12 border-t pt-6 px-6 lg:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="text-center">
          © 2025 Alfa Business Center. All rights reserved.
        </div>
        <div className="flex gap-4 text-gray-600 text-lg">
          <a
            href="https://twitter.com/alphabusinessc6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="hover:text-[#2d386a]" />
          </a>
          <a
            href="https://www.facebook.com/Alfa-Business-Center-100864201496641/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="hover:text-[#2d386a]" />
          </a>
          <a
            href="https://www.instagram.com/alfa_business_centre/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-[#2d386a]" />
          </a>
        </div>
      </div>

    </footer>
  );
}