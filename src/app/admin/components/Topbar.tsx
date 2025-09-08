'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Bell,
  Search,
} from 'lucide-react';
import Image from 'next/image';

export default function AdminNavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();

  return (
    <header className="h-16 w-full px-4 sm:px-6 flex items-center justify-between bg-white shadow-sm">
      {/* Left section: toggle + branding */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-[#2d386a] transition p-2"
        >
          <Menu size={22} />
        </button>
        <span className="text-lg font-semibold text-[#2d386a] hidden sm:block">
          Admin Dashboard
        </span>
      </div>

      {/* Right section: actions */}
      <div className="flex items-center space-x-4">
        {/* Search (optional) */}
        {/* <button className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-[#2d386a] transition">
          <Search size={18} />
          <span className="hidden md:inline">Search</span>
        </button>

        {/* Notifications */}
        {/* <button className="relative p-2 text-gray-600 hover:text-[#2d386a] transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button> */} 

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
          <Image
            src="/woman1.avif" // replace with actual avatar or placeholder
            alt="Admin"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
