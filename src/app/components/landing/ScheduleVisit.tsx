"use client";
import { CalendarIcon, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Image from "next/image";
import { useState } from "react";
import ReCaptchaV3 from "@/app/components/reusable/ReCaptchaV3";
import { bookTourSchema } from "@/app/lib/schemas/bookTourSchema";

export default function ScheduleVisit() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    referral: "",
    message: "",
    agree: false,
  });

  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    setIsSubmitting(true);

    if (!form.agree) {
      setErrors({ agree: "You must agree before submitting." });
      setIsSubmitting(false);
      return;
    }

    // Map ScheduleVisit form → bookTour API payload
    const payload = {
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      number: form.phone,
      preferredDate: form.date,
      preferredTime: form.time,
      message:
        form.referral && form.message
          ? `${form.message}\n\n(Referral: ${form.referral})`
          : form.referral
          ? `(Referral: ${form.referral})`
          : form.message,
    };

    // Validate using bookTourSchema
    const validation = bookTourSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(
        Object.entries(fieldErrors).reduce((acc, [key, value]) => {
          acc[key] = value?.[0] || "";
          return acc;
        }, {} as Record<string, string>)
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Verify reCAPTCHA
      const captchaResponse = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const captchaData = await captchaResponse.json();
      if (!captchaData.success) {
        throw new Error("CAPTCHA verification failed. Please try again.");
      }

      // Call Book Tour API
      const res = await fetch("/api/book-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSuccessMsg("Visit scheduled successfully! We'll contact you soon.");
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        referral: "",
        message: "",
        agree: false,
      });
      setRecaptchaToken("");
    } catch (error) {
      console.error(error);
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "Failed to submit. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured Data for Business and Event
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BusinessCenter",
    "name": "Alfa Business Center",
    "description": "Premium coworking space in Borivali, Mumbai offering tours and workspace solutions",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Workspace Tour Booking",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coworking Space Tour",
            "description": "Free guided tour of premium coworking facilities in Borivali Mumbai"
          }
        }
      ]
    }
  };

  return (
    <section className="bg-white py-8 px-4 md:px-6 lg:px-8 min-h-[80vh]" 
             itemScope 
             itemType="https://schema.org/BusinessCenter"
             aria-label="Schedule a Tour of Coworking Space in Borivali Mumbai">
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900" itemProp="name">
            Schedule Your Coworking Space Tour in Borivali Mumbai
          </h2>
          <p className="text-gray-600 text-base leading-snug" itemProp="description">
            Experience our premium coworking space in Borivali firsthand. Book a free guided tour 
            to explore modern workspaces, private cabins, meeting rooms, and amenities perfect 
            for Mumbai professionals, startups, and enterprises.
          </p>

          <div className="space-y-1 text-sm">
            {/* WhatsApp Chat */}
            <a
              href="https://wa.me/919820190836?text=Hi%20Alfa%20Team%2C%20I%27d%20like%20to%20schedule%20a%20tour%20of%20your%20coworking%20space%20in%20Borivali%2C%20Mumbai."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-[#2d386a] transition"
              aria-label="Contact Alfa Business Center on WhatsApp for Borivali coworking space tour"
              itemProp="telephone"
              content="+919820190836"
            >
              <SiWhatsapp className="text-[#2d386a]" size={18} />
              <span>+91 98201 90836</span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@alfaesol.com?subject=Schedule%20Tour%20-%20Alfa%20Business%20Center%20Borivali&body=Hi%20Alfa%20Team%2C%20I%27m%20interested%20in%20scheduling%20a%20tour%20of%20your%20coworking%20space%20in%20Borivali."
              className="flex items-center gap-2 text-gray-700 hover:text-[#2d386a] transition"
              aria-label="Email Alfa Business Center for coworking space tour in Borivali Mumbai"
              itemProp="email"
            >
              <Mail className="text-[#2d386a]" size={18} />
              <span>info@alfaesol.com</span>
            </a>

            {/* Address */}
            <a
              href="https://maps.google.com/?q=Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-[#2d386a] transition"
              aria-label="Visit Alfa Business Center location in Borivali West Mumbai"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <MapPin className="text-[#2d386a]" size={18} />
              <span itemProp="streetAddress">Dattani Tower, Mid Wing, Kore Kendra,</span>
              <span className="sr-only" itemProp="addressLocality">Borivali (West), Mumbai</span>
              <span className="sr-only" itemProp="addressRegion">Maharashtra</span>
              <span className="sr-only" itemProp="postalCode">400092</span>
            </a>
          </div>

          <div className="rounded-xl overflow-hidden mt-3">
            <Image
              src="/office_tour.jpg"
              alt="Professional Coworking Space Tour at Alfa Business Center in Borivali Mumbai - Modern Workspace with Private Cabins and Meeting Rooms"
              width={700}
              height={350}
              className="rounded-lg w-full h-[260px] object-cover"
              priority
              itemProp="image"
            />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm border text-sm" 
             itemScope 
             itemType="https://schema.org/EventReservation">
          <meta itemProp="reservationFor" content="Coworking Space Tour" />
          
          <form className="space-y-3" onSubmit={handleSubmit} itemScope itemType="https://schema.org/BookAction">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name *"
                required
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
                itemProp="givenName"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
                itemProp="familyName"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-600">{errors.fullName}</p>
            )}

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone *"
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
              itemProp="telephone"
            />
            {errors.number && (
              <p className="text-xs text-red-600">{errors.number}</p>
            )}

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email *"
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
              itemProp="email"
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <CalendarIcon
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                  aria-hidden="true"
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
                  itemProp="startDate"
                />
              </div>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
                itemProp="startTime"
              />
            </div>
            {errors.preferredDate && (
              <p className="text-xs text-red-600">{errors.preferredDate}</p>
            )}
            {errors.preferredTime && (
              <p className="text-xs text-red-600">{errors.preferredTime}</p>
            )}

            <input
              type="text"
              name="referral"
              value={form.referral}
              onChange={handleChange}
              placeholder="How Did You Hear About Us"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Message (Optional: Tell us about your workspace requirements)"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a] resize-none"
              itemProp="description"
            ></textarea>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
                className="mt-1 cursor-pointer"
              />
              <p className="text-xs text-gray-600 leading-tight">
                I agree that my submitted data is being collected and stored. *
              </p>
            </div>
            {errors.agree && (
              <p className="text-xs text-red-600">{errors.agree}</p>
            )}

            {/* reCAPTCHA v3 - invisible */}
            <ReCaptchaV3 onVerify={handleRecaptchaVerify} />

            {errors.form && (
              <p className="text-xs text-red-600">{errors.form}</p>
            )}
            {successMsg && (
              <p className="text-xs text-green-600">{successMsg}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !recaptchaToken}
              className={`w-full bg-[#2d386a] hover:bg-[#1e2952] cursor-pointer text-white font-medium py-2.5 rounded-md transition text-sm ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              aria-label="Schedule a tour of Alfa Business Center coworking space in Borivali Mumbai"
              itemProp="potentialAction"
            >
              {isSubmitting ? "Scheduling Your Borivali Tour..." : "Schedule Borivali Tour"}
            </button>

            <p className="text-xs text-gray-500">
              This site is protected by reCAPTCHA and the Google
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                Privacy Policy
              </a>{" "}
              and
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </div>
      </div>

      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h3>Book a Tour of Premium Coworking Space in Borivali Mumbai</h3>
        <p>
          Schedule a free guided tour of Alfa Business Center in Borivali West, Mumbai. 
          Experience our modern coworking facilities including hot desks, dedicated workspaces, 
          private cabins, meeting rooms, and premium business amenities. Perfect for startups, 
          freelancers, and enterprises looking for flexible workspace solutions in Mumbai.
        </p>
        <p>
          Our Borivali location at Dattani Tower, Kore Kendra offers convenient access with 
          modern infrastructure, high-speed internet, and professional environment. During your 
          tour, you'll see:
        </p>
        <ul>
          <li>Modern coworking spaces with ergonomic furniture</li>
          <li>Private cabins for teams and individual professionals</li>
          <li>Professional meeting rooms for client presentations</li>
          <li>High-speed internet and IT infrastructure</li>
          <li>Common areas and breakout spaces</li>
          <li>Kitchen and pantry facilities</li>
        </ul>
        <p>
          <strong>Tour Availability:</strong> Monday to Friday, 9:00 AM - 6:00 PM | Saturday, 9:00 AM - 2:00 PM
        </p>
        <p>
          <strong>Location:</strong> Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), 
          next to McDonald, Mumbai, Maharashtra 400092
        </p>
        <p>
          Keywords: schedule coworking space tour borivali, book office tour mumbai, 
          visit business center borivali west, alfa business center tour appointment, 
          workspace viewing borivali, professional office tour mumbai
        </p>
      </div>
    </section>
  );
}