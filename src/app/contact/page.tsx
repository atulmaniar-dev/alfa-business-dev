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

  return (
    <>
      <ContactBanner />

      <section className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="border border-gray-300 rounded-xl shadow-sm p-6 sm:p-8 md:p-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left: Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2d386a] mb-6">Send Us a Message</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-black">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">Phone Number</label>
                    <input
                      type="tel"
                      name="number"
                      value={form.number}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Enter your question or feedback"
                      required
                      className="w-full border border-gray-300 h-24 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>

                  {/* reCAPTCHA v3 - invisible */}
                  <ReCaptchaV3 onVerify={handleRecaptchaVerify} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2 cursor-pointer bg-[#2d386a] text-white px-6 py-2 rounded-md hover:bg-[#1f2a4e] transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
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
<div className="space-y-6">
  <div className="rounded-lg overflow-hidden h-64 border border-gray-300">
    <iframe
      src="https://maps.google.com/maps?q=Alfa%20Business%20Center,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen
    ></iframe>
  </div>

  <div>
    <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">
      Our Location & Contact Info
    </h3>
    <ul className="space-y-4 text-sm text-black">
      {/* Address → Google Maps Link */}
      <li className="flex items-start gap-3">
        <MapPin className="text-[#2d386a] w-5 h-5 mt-0.5" />
        <a
          href="https://maps.google.com/?q=Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to
          McDonald, Mumbai, Maharashtra 400092
        </a>
      </li>

      {/* Phone → Click to Call */}
      <li className="flex items-center gap-3">
        <Phone className="text-[#2d386a] w-5 h-5" />
        <a
          href="tel:+919820190836"
          className="hover:underline"
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
        >
          info@alfaesol.com
        </a>
      </li>
    </ul>
  </div>
</div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}