import './globals.css'
import { Toaster } from 'sonner'
import LayoutWrapper from '@/app/components/layout/LayoutWrapper'

export const metadata = {
  title: {
    default: 'Alfa Business Center',
    template: '%s | Alfa Business Center',
  },
  description: 'Premium coworking and business spaces in Mumbai with modern amenities.',
  keywords: ['coworking', 'business center', 'office space', 'Mumbai', 'Alfa'],
  authors: [{ name: 'Alfa Business Center', url: 'https://www.weworkoffice.in/' }],
  metadataBase: new URL('https://www.weworkoffice.in/'),
  openGraph: {
    title: 'Alfa Business Center',
    description: 'Explore modern and flexible coworking spaces in Mumbai.',
    url: 'https://www.weworkoffice.in/',
    siteName: 'Alfa Business Center',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Alfa Business Center',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfa Business Center',
    description: 'Explore modern and flexible coworking spaces in Mumbai.',
    creator: '@alfabusiness',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: 'https://www.weworkoffice.in/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster />
        <LayoutWrapper>{children}</LayoutWrapper>
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919820190836?text=Hi%20Alfa%20Team%2C%20I%27m%20interested%20in%20booking%20a%20tour%20of%20your%20coworking%20space."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with us on WhatsApp"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-50 group"
        >
          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.52 3.48a11.994 11.994 0 00-17 0c-3.89 3.89-4.17 10.02-.65 14.31l-1.41 5.19 5.32-1.39A11.987 11.987 0 0021.03 4.99a11.963 11.963 0 00-.51-1.51zM12 20a8 8 0 01-4.24-1.18l-.3-.17-3.14.83.83-3.06-.18-.3A7.972 7.972 0 014 12a8 8 0 1116 0 7.978 7.978 0 01-8 8zm3.87-5.13c-.22-.11-1.29-.64-1.49-.72s-.35-.11-.5.11c-.14.22-.57.72-.7.87s-.26.17-.48.06a6.63 6.63 0 01-1.95-1.2 7.22 7.22 0 01-1.34-1.67c-.14-.22 0-.34.1-.45.1-.11.22-.26.33-.4.11-.14.15-.23.22-.38.07-.15.04-.28-.02-.4s-.5-1.2-.69-1.65c-.18-.45-.37-.39-.5-.39h-.42a.8.8 0 00-.58.27 2.43 2.43 0 00-.76 1.8c0 1.06.77 2.1.88 2.25.11.15 1.52 2.4 3.68 3.36.51.22.9.35 1.21.45.51.16.98.14 1.35.09.41-.06 1.29-.52 1.48-1.02.18-.51.18-.95.13-1.04-.06-.09-.2-.14-.42-.25z" />
            </svg>

            {/* Tooltip (on hover) */}
            <span className="absolute bottom-full mb-2 px-3 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Chat with us
            </span>
          </div>
        </a>



      </body>
    </html>
  )
}