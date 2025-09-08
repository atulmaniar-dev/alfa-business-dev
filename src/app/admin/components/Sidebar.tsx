'use client';

import { Home, PlusCircle, LogOut, LayoutDashboard, FileImage } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { LuWallet } from "react-icons/lu";
import { TiContacts, TiMessage } from "react-icons/ti";

const menu = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: <LuWallet size={20} />, label: 'Pricing Plans', href: '/admin/plans' },
  { icon: <PlusCircle size={20} />, label: 'Tour Requests', href: '/admin/tour' },
  { icon: <Home size={20} />, label: 'Amenities', href: '/admin/amenities' },
  { icon: <FileImage size={20} />, label: 'Gallery', href: '/admin/gallery' },
  { icon: <TiMessage size={20} />, label: 'Testimonials', href: '/admin/testimonials' },
  { icon: <TiContacts size={20} />, label: 'Contact', href: '/admin/contact' },
];

export default function AdminSidebar({
  collapsed,
  onLinkClick,
}: {
  collapsed: boolean;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <aside
      className={clsx(
        'h-full bg-white shadow-md border-r border-gray-200 transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* <div className="h-16 flex items-center justify-center font-semibold text-[#2d386a] text-lg tracking-wide border-b border-gray-200">
        {collapsed ? 'A' : 'Alfa'}
      </div> */}

      <nav className="flex flex-col gap-1 px-2 py-4 flex-grow overflow-y-auto">
        {menu.map(({ icon, label, href }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              onClick={onLinkClick}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-[#2d386a] text-white shadow-inner'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#2d386a]'
              )}
            >
              <span className={clsx('text-[18px]', isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#2d386a]')}>
                {icon}
              </span>
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 px-3 py-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
