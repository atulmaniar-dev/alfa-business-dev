'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return (
      <div className="bg-white min-h-screen text-black">
        {children}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-14">{children}</main>
      <Footer />
    </>
  )
}
