'use client';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { bookTourSchema } from '@/app/lib/schemas/bookTourSchema';
import ReCaptchaV3 from '@/app/components/reusable/ReCaptchaV3';
import { SiWhatsapp } from 'react-icons/si';
export default function VisitPage() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        number: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRecaptchaVerify = (token: string) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccessMsg('');
        setLoading(true);

        // Validate form
        const validation = bookTourSchema.safeParse(form);
        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setErrors(
                Object.entries(fieldErrors).reduce((acc, [key, value]) => {
                    acc[key] = value?.[0] || '';
                    return acc;
                }, {} as Record<string, string>)
            );
            setLoading(false);
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

            // Submit form data
            const res = await fetch('/api/book-tour', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }

            setSuccessMsg('Tour booking submitted successfully!');
            setForm({
                fullName: '',
                email: '',
                number: '',
                preferredDate: '',
                preferredTime: '',
                message: '',
            });
            setRecaptchaToken('');
        } catch (error) {
            console.error(error);
            setErrors({ 
                form: error instanceof Error ? error.message : 'Failed to submit. Please try again later.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 md:px-12 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#2d386a] mb-10 leading-tight sm:leading-snug">
                    <span className="inline">
                        Schedule Your Exclusive Visit to{' '}
                        <span className="inline-block bg-[#2d386a] text-white px-4 rounded-xl">
                            Alfa Business Center
                        </span>
                    </span>
                </h1>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-3 text-black">Book Your Tour</h2>
                        <p className="mb-5 text-gray-600">
                            Fill out the form below to schedule a visit to our coworking space. We look forward to meeting you!
                        </p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-1 font-medium text-black">Full Name *</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    required
                                />
                                {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-black">Email Address *</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@example.com"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-black">Phone Number *</label>
                                <input
                                    name="number"
                                    type="tel"
                                    value={form.number}
                                    onChange={handleChange}
                                    placeholder="+91 12345 67890"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    required
                                />
                                {errors.number && <p className="text-sm text-red-600">{errors.number}</p>}  
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium text-black">Preferred Date</label>
                                    <input
                                        name="preferredDate"
                                        type="date"
                                        value={form.preferredDate}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    />
                                    {errors.preferredDate && <p className="text-sm text-red-600">{errors.preferredDate}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-black">Preferred Time</label>
                                    <input
                                        name="preferredTime"
                                        type="time"
                                        value={form.preferredTime}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    />
                                    {errors.preferredTime && <p className="text-sm text-red-600">{errors.preferredTime}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-black">Your Message (Optional)</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your needs, preferred time, or any specific questions..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                />
                            </div>

                            {/* reCAPTCHA v3 - invisible */}
                            <ReCaptchaV3 onVerify={handleRecaptchaVerify} />

                            <p className="text-xs text-gray-500">
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                apply.
                            </p>

                            {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
                            {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

                            <button
                                type="submit"
                                disabled={loading || !recaptchaToken}
                                className={`w-full bg-[#2d386a] hover:bg-[#1f2a4e] text-white cursor-pointer py-2 rounded-lg font-semibold transition duration-200 ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Submitting...' : 'Submit Booking Request'}
                            </button>
                        </form>
                    </div>

                    {/* Location & Contact */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-3 text-black">Our Location & Contact</h2>
  <p className="mb-5 text-gray-600">
    We are conveniently located in the heart of Mumbai. Feel free to reach out to us through any of the channels below.
  </p>

  {/* Map */}
  <div className="mb-5">
    <iframe
      src="https://maps.google.com/maps?q=Dattani%20Tower%2C%20Mid%20Wing%2C%20Kore%20Kendra%2C%20Borivali%20(West)%2C%20next%20to%20McDonald%2C%20Mumbai%2C%20Maharashtra%20400092&t=&z=15&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="350"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full rounded-lg"
    ></iframe>
    <p className="text-sm text-center mt-2 text-gray-500">Interactive Map View</p>
  </div>

  {/* Contact Info */}
  <div className="space-y-4 text-sm text-gray-700">
    {/* Address → Opens Google Maps */}
    <a
      href="https://maps.google.com/?q=Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2 hover:text-[#2d386a] transition"
    >
      <MapPin className="text-[#2d386a] w-5 h-5 mt-0.5" />
      <span>
        Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092
      </span>
    </a>

    {/* Phone → Click to call */}
    <a
      href="tel:+919820190836"
      className="flex items-center gap-2 hover:text-[#2d386a] transition"
    >
      <Phone className="text-[#2d386a] w-5 h-5" />
      <span>+91 98201 90836</span>
    </a>

    {/* Email → Opens mail client */}
    <a
      href="mailto:info@alfaesol.com"
      className="flex items-center gap-2 hover:text-[#2d386a] transition"
    >
      <Mail className="text-[#2d386a] w-5 h-5" />
      <span>info@alfaesol.com</span>
    </a>

    {/* WhatsApp → Opens chat */}
    <a
      href="https://wa.me/919820190836"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-[#2d386a] transition"
    >
      <SiWhatsapp className="text-[#2d386a]" size={20} />
      <span>Chat on WhatsApp</span>
    </a>
  </div>
</div>

                </div>
            </div>
        </div>
    );
}