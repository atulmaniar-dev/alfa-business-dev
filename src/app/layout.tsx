import './globals.css'
import { Toaster } from 'sonner'
import LayoutWrapper from '@/app/components/layout/LayoutWrapper'

export const metadata = {
  title: {
    default: 'Premium Coworking Space in Mumbai | Alfa Business Center - Borivali',
    template: '%s | Alfa Business Center - Coworking Space Mumbai',
  },
  description: 'Alfa Business Center offers premium coworking spaces, private offices, meeting rooms & virtual offices in Borivali, Mumbai. Flexible plans for startups, freelancers & enterprises. Book a tour today!',
  keywords: ['coworking space mumbai', 'business center mumbai', 'office space mumbai', 'shared office mumbai', 'meeting rooms mumbai', 'virtual office mumbai', 'coworking borivali', 'Alfa Business Center', 'office space borivali'],
  authors: [{ name: 'Alfa Business Center', url: 'https://weworkoffice.in/' }],
  metadataBase: new URL('https://weworkoffice.in/'),
  openGraph: {
    title: 'Premium Coworking Space in Mumbai | Alfa Business Center - Borivali',
    description: 'Alfa Business Center offers premium coworking spaces, private offices, meeting rooms & virtual offices in Borivali, Mumbai. Flexible plans for startups, freelancers & enterprises.',
    url: 'https://weworkoffice.in/',
    siteName: 'Alfa Business Center',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Alfa Business Center - Premium Coworking Space in Mumbai',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Coworking Space in Mumbai | Alfa Business Center - Borivali',
    description: 'Alfa Business Center offers premium coworking spaces, private offices, meeting rooms & virtual offices in Borivali, Mumbai. Flexible plans for startups, freelancers & enterprises.',
    creator: '@alfabusiness',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://weworkoffice.in/',
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console code add karo
  },
}

// Local Business Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BusinessCenter',
  name: 'Alfa Business Center',
  description: 'Premium coworking space in Mumbai offering flexible workspace solutions, private offices, meeting rooms and virtual offices in Borivali West.',
  url: 'https://weworkoffice.in/',
  telephone: '+91-98201-90836',
  email: 'info@alfaesol.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dattani Tower, Mid Wing, Kore Kendra, Borivali (West), next to McDonald',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400092',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '19.2307', // Borivali West coordinates
    longitude: '72.8567',
  },
  openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-14:00',
  priceRange: '₹₹',
  sameAs: [
    'https://www.facebook.com/alfabusinesscenter',
    'https://www.instagram.com/alfabusinesscenter',
    'https://www.linkedin.com/company/alfabusinesscenter',
  ],
  areaServed: ['Borivali', 'Mumbai', 'Maharashtra'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Coworking Plans',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hot Desk',
          description: 'Flexible desk space with access to all amenities',
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dedicated Desk',
          description: 'Personal dedicated workspace',
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Private Cabin',
          description: 'Private office cabin for teams',
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Meeting Room',
          description: 'Professional meeting and conference rooms',
        }
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Borivali West" />
        <meta name="geo.position" content="19.2307;72.8567" />
        <meta name="ICBM" content="19.2307, 72.8567" />
        
        {/* Mobile specific */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
      </head>
      <body suppressHydrationWarning={true}>
        <Toaster />
        <LayoutWrapper>{children}</LayoutWrapper>
        
        {/* Floating WhatsApp Button with better accessibility */}
        <a
          href="https://wa.me/919820190836?text=Hi%20Alfa%20Team%2C%20I%27m%20interested%20in%20your%20coworking%20space%20in%20Borivali%2C%20Mumbai."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with Alfa Business Center on WhatsApp for coworking space in Borivali, Mumbai"
          aria-label="Contact Alfa Business Center on WhatsApp for coworking space in Borivali, Mumbai"
          className="fixed bottom-5 right-5 z-50 group"
        >
          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.52 3.48a11.994 11.994 0 00-17 0c-3.89 3.89-4.17 10.02-.65 14.31l-1.41 5.19 5.32-1.39A11.987 11.987 0 0021.03 4.99a11.963 11.963 0 00-.51-1.51zM12 20a8 8 0 01-4.24-1.18l-.3-.17-3.14.83.83-3.06-.18-.3A7.972 7.972 0 014 12a8 8 0 1116 0 7.978 7.978 0 01-8 8zm3.87-5.13c-.22-.11-1.29-.64-1.49-.72s-.35-.11-.5.11c-.14.22-.57.72-.7.87s-.26.17-.48.06a6.63 6.63 0 01-1.95-1.2 7.22 7.22 0 01-1.34-1.67c-.14-.22 0-.34.1-.45.1-.11.22-.26.33-.4.11-.14.15-.23.22-.38.07-.15.04-.28-.02-.4s-.5-1.2-.69-1.65c-.18-.45-.37-.39-.5-.39h-.42a.8.8 0 00-.58.27 2.43 2.43 0 00-.76 1.8c0 1.06.77 2.1.88 2.25.11.15 1.52 2.4 3.68 3.36.51.22.9.35 1.21.45.51.16.98.14 1.35.09.41-.06 1.29-.52 1.48-1.02.18-.51.18-.95.13-1.04-.06-.09-.2-.14-.42-.25z" />
            </svg>

            {/* Tooltip with location mention */}
            <span className="absolute bottom-full mb-2 px-3 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              WhatsApp for Borivali Coworking
            </span>
          </div>
        </a>
      </body>
    </html>
  )
}