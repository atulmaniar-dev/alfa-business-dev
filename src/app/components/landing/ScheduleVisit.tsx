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

      setSuccessMsg("Visit scheduled successfully! We’ll contact you soon.");
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

  return (
    <section className="bg-white py-8 px-4 md:px-6 lg:px-8 min-h-[80vh]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Schedule Your Visit
          </h2>
          <p className="text-gray-600 text-base leading-snug">
            Want to explore our coworking space before joining? Fill out the
            form and our manager will contact you shortly.
          </p>

          <div className="space-y-1 text-sm">
  {/* WhatsApp Chat */}
  <a
    href="https://wa.me/919820190836"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-gray-700 hover:text-[#2d386a] transition"
  >
    <SiWhatsapp className="text-[#2d386a]" size={18} />
    <span>+91 98201 90836</span>
  </a>

  {/* Email → Click to open mail client */}
  <a
    href="mailto:info@alfaesol.com"
    className="flex items-center gap-2 text-gray-700 hover:text-[#2d386a] transition"
  >
    <Mail className="text-[#2d386a]" size={18} />
    <span>info@alfaesol.com</span>
  </a>

  {/* Address → Open Google Maps */}
  <a
    href="https://maps.google.com/?q=Dattani Tower, Mid Wing, Kore Kendra,
Borivali (West), next to McDonald,
Mumbai, Maharashtra 400092"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-gray-700 hover:text-[#2d386a] transition"
  >
    <MapPin className="text-[#2d386a]" size={18} />
    <span>Dattani Tower, Mid Wing, Kore Kendra,
Borivali (West), next to McDonald,
Mumbai, Maharashtra 400092</span>
  </a>
</div>


          <div className="rounded-xl overflow-hidden mt-3">
            <Image
              src="/office_tour.jpg"
              alt="Office Tour"
              width={700}
              height={350}
              className="rounded-lg w-full h-[260px] object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm border text-sm">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name *"
                required
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
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
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <CalendarIcon
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
                />
              </div>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
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
              placeholder="Message"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a] resize-none"
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
            >
              {isSubmitting ? "Scheduling..." : "Schedule Visit"}
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
    </section>
  );
}
