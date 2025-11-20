export const metadata = {
  title: 'Premium Coworking Space in Mumbai | Private Offices & Meeting Rooms - Alfa Business Center Borivali',
  description: 'Alfa Business Center offers premium coworking spaces, private offices, meeting rooms & virtual offices in Borivali, Mumbai. Flexible plans for startups, freelancers & enterprises. Book a tour today! +91-98201-90836',
  keywords: [
    'coworking space mumbai',
    'office space borivali', 
    'shared office mumbai',
    'business center mumbai',
    'meeting rooms mumbai',
    'virtual office mumbai',
    'private cabins borivali',
    'hot desk mumbai',
    'dedicated desk borivali',
    'alfa business center',
    'coworking space borivali west',
    'office for rent mumbai'
  ],
  authors: [{ name: 'Alfa Business Center' }],
  creator: 'Alfa Business Center',
  publisher: 'Alfa Business Center',
  metadataBase: new URL('https://weworkoffice.in'),
  alternates: {
    canonical: 'https://weworkoffice.in',
  },
  openGraph: {
    title: 'Premium Coworking Space in Mumbai | Alfa Business Center - Borivali',
    description: 'Alfa Business Center offers premium coworking spaces, private offices, meeting rooms & virtual offices in Borivali, Mumbai. Flexible plans for startups, freelancers & enterprises.',
    url: 'https://weworkoffice.in',
    siteName: 'Alfa Business Center',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alfa Business Center - Premium Coworking Space in Borivali, Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Coworking Space in Mumbai | Alfa Business Center - Borivali',
    description: 'Alfa Business Center offers premium coworking spaces, private offices, meeting rooms & virtual offices in Borivali, Mumbai.',
    images: ['/og-image.jpg'],
    creator: '@alfabusiness',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-search-console-verification-code',
  },
}

import HeroSection from "@/app/components/landing/HeroSection";
import WhyChooseSection from "@/app/components/landing/WhyChooseSection";
import ScheduleVisit from "./components/landing/ScheduleVisit";
import TestimonialsSection from "@/app/components/landing/TestimonialsSection";
import PricingSection from "@/app/components/landing/PricingSection";
import LimitedOfferBanner from "./components/landing/LTOBanner";
import TrustedBySection from "@/app/components/AboutUsComponents/TrustedBySection";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-10">
      <HeroSection />
      <WhyChooseSection/>
      <PricingSection />
      <TestimonialsSection />
      
      <LimitedOfferBanner />
      
      <ScheduleVisit />
      <TrustedBySection />
    </main>
  );
}
