'use client';
import React, { useState } from 'react';
import ReCaptchaV3 from '@/app/components/reusable/ReCaptchaV3';

export default function PaymentPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRecaptchaVerify = (token: string) => {
        setRecaptchaToken(token);
    };

    const handlePaymentClick = () => {
        // In a real implementation, this would redirect to your payment gateway
        window.location.href = 'https://your-payment-gateway.com';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccessMsg('');
        setLoading(true);

        // Basic validation
        if (!form.name || !form.email || !form.subject) {
            setErrors({ form: 'Please fill in all required fields' });
            setLoading(false);
            return;
        }

        if (!recaptchaToken) {
            setErrors({ form: 'Please complete the CAPTCHA verification' });
            setLoading(false);
            return;
        }

        try {
            // Verify reCAPTCHA first
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
            const res = await fetch('/api/payment-help', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }

            setSuccessMsg('Your inquiry has been submitted successfully!');
            setForm({
                name: '',
                email: '',
                subject: '',
                message: ''
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
        <div className="min-h-screen bg-white px-4 py-10 md:px-16">
            {/* Header Section */}
            <div className="border border-gray-300 rounded-2xl text-center py-8 px-4 mb-10 shadow-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2d386a] mb-4">
                    Seamless Online Payments
                </h1>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Experience quick and secure transactions for all your coworking services.
                    Click below to proceed to our trusted payment partner.
                </p>
                <button 
                    onClick={handlePaymentClick}
                    className="bg-[#2d386a] hover:bg-[#1f2a4e] text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                >
                    Proceed to Payment
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* QR Code Section */}
                <div className="border border-gray-300 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-[#2d386a] mb-4">Pay with QR Code</h2>
                    <div className="bg-gray-100 p-4 rounded-xl flex justify-center items-center mb-4">
                        <img 
                            src="/qr-code.png" 
                            alt="QR Code" 
                            className="w-50 h-50 object-contain" 
                        />
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-4">
                        Scan the QR code with your preferred UPI app or banking application
                        for instant payment directly from your mobile device.
                    </p>
                    <img
                        src="/qrcode.webp"
                        alt="Scan Illustration"
                        className="mx-auto w-full h-auto rounded-xl shadow-md mt-2"
                    />
                </div>

                {/* Payment Help Section */}
                <div className="border border-gray-300 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold text-[#2d386a] mb-4">Need Payment Help?</h2>
                    <p className="text-m text-gray-600 mb-4">
                        Our dedicated support team is here to assist you with any
                        payment-related queries or issues.
                    </p>
                    <div className="space-y-2 text-m text-gray-700 mb-6">
                        <p className="flex items-center gap-2">+91 98765 43210</p>
                        <p className="flex items-center gap-2">payments@alfabusiness.com</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-1 font-medium text-sm">Your Name *</label>
                            <input
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-sm">Your Email *</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@example.com"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-sm">Subject *</label>
                            <input
                                name="subject"
                                type="text"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="e.g., Payment Error"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-sm">Your Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Describe your payment issue or question..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
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
                            className={`w-full bg-[#2d386a] hover:bg-[#1f2a4e] text-white py-2 rounded-lg font-semibold transition duration-200 ${
                                loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Sending...' : 'Send Inquiry'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}