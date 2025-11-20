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

    // Structured Data for Tour Booking Page
    const tourBookingStructuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Schedule Tour - Alfa Business Center Coworking Space Borivali Mumbai",
        "description": "Book a personalized tour of premium coworking spaces, private cabins, meeting rooms and facilities at Alfa Business Center Borivali Mumbai",
        "url": "https://weworkoffice.in/visit",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Alfa Business Center",
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
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Alfa Business Center",
            "url": "https://weworkoffice.in",
            "telephone": "+91-98201-90836",
            "email": "info@alfaesol.com"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://weworkoffice.in/visit",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01"
        },
        "performer": {
            "@type": "Organization",
            "name": "Alfa Business Center"
        }
    };

    return (
        <div 
            className="min-h-screen bg-white px-4 md:px-12 py-8"
            itemScope
            itemType="https://schema.org/Event"
            aria-label="Book Tour - Alfa Business Center Coworking Space Borivali Mumbai"
        >
            
            {/* Structured Data for Tour Booking */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tourBookingStructuredData) }}
            />

            <meta itemProp="name" content="Book Tour - Alfa Business Center Coworking Space Borivali Mumbai" />
            <meta itemProp="description" content="Schedule a personalized tour of our premium coworking spaces, private cabins, meeting rooms and facilities in Borivali West Mumbai" />
            
            <div className="max-w-7xl mx-auto">
                <h1 
                    className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#2d386a] mb-10 leading-tight sm:leading-snug"
                    itemProp="headline"
                >
                    <span className="inline">
                        Schedule Your Exclusive Tour of{' '}
                        <span className="inline-block bg-[#2d386a] text-white px-4 rounded-xl">
                            Alfa Business Center Borivali Mumbai
                        </span>
                    </span>
                </h1>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Tour Booking Form */}
                    <div 
                        className="bg-white border border-gray-200 rounded-xl p-6"
                        itemScope
                        itemType="https://schema.org/BookAction"
                    >
                        <h2 className="text-2xl font-bold mb-3 text-black">
                            Book Your Personalized Coworking Space Tour
                        </h2>
                        <p className="mb-5 text-gray-600">
                            Schedule a visit to experience our premium coworking spaces, private cabins, 
                            meeting rooms and facilities in Borivali West Mumbai. We look forward to showing you around!
                        </p>
                        
                        <form 
                            className="space-y-4" 
                            onSubmit={handleSubmit}
                            itemScope
                            itemType="https://schema.org/Reservation"
                        >
                            <meta itemProp="reservationFor" content="Alfa Business Center Tour" />
                            
                            <div>
                                <label 
                                    htmlFor="fullName" 
                                    className="block mb-1 font-medium text-black"
                                >
                                    Full Name *
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    required
                                    aria-required="true"
                                    itemProp="customer name"
                                />
                                {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block mb-1 font-medium text-black"
                                >
                                    Email Address *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    required
                                    aria-required="true"
                                    itemProp="email"
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label 
                                    htmlFor="number" 
                                    className="block mb-1 font-medium text-black"
                                >
                                    Phone Number *
                                </label>
                                <input
                                    id="number"
                                    name="number"
                                    type="tel"
                                    value={form.number}
                                    onChange={handleChange}
                                    placeholder="+91 12345 67890"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    required
                                    aria-required="true"
                                    itemProp="telephone"
                                />
                                {errors.number && <p className="text-sm text-red-600">{errors.number}</p>}  
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label 
                                        htmlFor="preferredDate" 
                                        className="block mb-1 font-medium text-black"
                                    >
                                        Preferred Tour Date
                                    </label>
                                    <input
                                        id="preferredDate"
                                        name="preferredDate"
                                        type="date"
                                        value={form.preferredDate}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                        itemProp="startDate"
                                    />
                                    {errors.preferredDate && <p className="text-sm text-red-600">{errors.preferredDate}</p>}
                                </div>
                                <div>
                                    <label 
                                        htmlFor="preferredTime" 
                                        className="block mb-1 font-medium text-black"
                                    >
                                        Preferred Tour Time
                                    </label>
                                    <input
                                        id="preferredTime"
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
                                <label 
                                    htmlFor="message" 
                                    className="block mb-1 font-medium text-black"
                                >
                                    Your Workspace Requirements
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your workspace needs, team size, preferred amenities, or any specific questions about our Borivali coworking space..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    itemProp="description"
                                />
                            </div>

                            {/* reCAPTCHA v3 - invisible */}
                            <ReCaptchaV3 onVerify={handleRecaptchaVerify} />

                            <p className="text-xs text-gray-500">
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a 
                                    href="https://policies.google.com/privacy" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:underline"
                                >
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a 
                                    href="https://policies.google.com/terms" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:underline"
                                >
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
                                aria-label={loading ? 'Submitting tour booking request' : 'Submit tour booking request for Alfa Business Center Borivali'}
                            >
                                {loading ? 'Submitting...' : 'Schedule My Tour'}
                            </button>
                        </form>
                    </div>

                    {/* Location & Contact */}
                    <div 
                        className="bg-white border border-gray-200 rounded-xl p-6"
                        itemScope
                        itemType="https://schema.org/Place"
                    >
                        <h2 className="text-2xl font-bold mb-3 text-black">
                            Visit Our Coworking Space in Borivali Mumbai
                        </h2>
                        <p className="mb-5 text-gray-600">
                            Experience our premium coworking facilities in the heart of Borivali West. 
                            Conveniently located with excellent connectivity and modern amenities.
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
                                title="Alfa Business Center Location Map - Coworking Space Borivali Mumbai"
                                aria-label="Interactive map showing Alfa Business Center location in Borivali West Mumbai"
                                itemProp="hasMap"
                            ></iframe>
                            <p className="text-sm text-center mt-2 text-gray-500">Interactive Map View - Borivali West Location</p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 text-sm text-gray-700">
                            {/* Address → Opens Google Maps */}
                            <a
                                href="https://maps.google.com/?q=Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald, Mumbai, Maharashtra 400092"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 hover:text-[#2d386a] transition"
                                itemProp="address"
                                itemScope
                                itemType="https://schema.org/PostalAddress"
                            >
                                <MapPin className="text-[#2d386a] w-5 h-5 mt-0.5" />
                                <span>
                                    <span itemProp="streetAddress">Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald</span>,{''}
                                    <span itemProp="addressLocality"> Mumbai</span>,{''}
                                    <span itemProp="addressRegion"> Maharashtra</span>{''}
                                    <span itemProp="postalCode"> 400092</span>
                                </span>
                            </a>

                            {/* Phone → Click to call */}
                            <a
                                href="tel:+919820190836"
                                className="flex items-center gap-2 hover:text-[#2d386a] transition"
                                itemProp="telephone"
                            >
                                <Phone className="text-[#2d386a] w-5 h-5" />
                                <span>+91 98201 90836</span>
                            </a>

                            {/* Email → Opens mail client */}
                            <a
                                href="mailto:info@alfaesol.com"
                                className="flex items-center gap-2 hover:text-[#2d386a] transition"
                                itemProp="email"
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
                                aria-label="Chat with Alfa Business Center on WhatsApp for tour booking"
                            >
                                <SiWhatsapp className="text-[#2d386a]" size={20} />
                                <span>Chat on WhatsApp for Quick Tour Booking</span>
                            </a>
                        </div>

                        {/* Tour Information */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-black mb-2">Tour Information</h3>
                            <ul className="text-sm text-black space-y-1">
                                <li>• Personalized 30-minute facility tour</li>
                                <li>• See available workspaces & private cabins</li>
                                <li>• Discuss flexible membership plans</li>
                                <li>• Get answers to all your questions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden SEO Content for Search Engines */}
            <div className="sr-only" aria-hidden="true">
                <h2>Book Tour - Alfa Business Center Coworking Space Borivali Mumbai</h2>
                <p>
                    Schedule a personalized tour of Alfa Business Center, the premier coworking space in Borivali West Mumbai. 
                    Experience our modern workspaces, private cabins, meeting rooms and premium amenities firsthand.
                </p>
                
                <h3>Why Schedule a Tour?</h3>
                <p>
                    Visiting our Borivali coworking space allows you to experience the environment, meet our community, 
                    and see our facilities including high-speed internet, meeting rooms, lounge areas, and private cabins. 
                    Our team will guide you through available workspace options and answer all your questions.
                </p>

                <h3>What to Expect During Your Tour:</h3>
                <ul>
                    <li>Personalized facility walkthrough with our workspace consultant</li>
                    <li>View available private cabins, dedicated desks and hot desks</li>
                    <li>Experience our meeting rooms and common areas</li>
                    <li>Learn about amenities including high-speed internet, printing, pantry</li>
                    <li>Discuss flexible membership plans and pricing</li>
                    <li>Get answers to specific workspace requirements</li>
                </ul>

                <h3>Tour Availability:</h3>
                <p>
                    We conduct tours Monday through Friday from 9:00 AM to 6:00 PM and Saturdays from 9:00 AM to 2:00 PM. 
                    Weekend tours can be arranged by special request. Each tour typically takes 20-30 minutes.
                </p>

                <h3>Location & Directions:</h3>
                <p>
                    Alfa Business Center is located in Dattani Tower, Kore Kendra, Borivali West, next to McDonald's. 
                    Easily accessible from Borivali railway station and well-connected by road. Ample parking available.
                </p>

                <h3>After Your Tour:</h3>
                <p>
                    Following your visit, we'll provide detailed information about available plans, pricing, 
                    and any ongoing promotions. We can also arrange a trial day if you'd like to experience 
                    working from our space before making a decision.
                </p>

                <p>
                    Keywords: book tour alfa business center borivali, coworking space visit mumbai, 
                    schedule tour borivali west, office space viewing, workspace tour appointment, 
                    visit coworking space borivali, alfa business center tour booking, 
                    personalized workspace tour mumbai, borivali coworking facility visit
                </p>

                <p>
                    <strong>Tour Booking SEO Terms:</strong> schedule visit coworking borivali, 
                    book appointment business center, workspace tour mumbai, office viewing borivali west, 
                    facility tour alfa business center, personalized tour coworking space, 
                    visit shared office borivali, meeting room tour, private cabin viewing
                </p>
            </div>
        </div>
    );
}