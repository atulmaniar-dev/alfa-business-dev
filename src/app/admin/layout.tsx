'use client';

// AdminLayout.tsx
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './components/Sidebar';
import AdminNavbar from './components/Topbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    const checkLoginStatus = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [isLoginPage]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && collapsed && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setCollapsed(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed, isMobile]);

  const handleToggleSidebar = () => setCollapsed(!collapsed);
  const handleCloseSidebar = () => isMobile && setCollapsed(false);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (isLoginPage) return <div className="min-h-screen">{children}</div>;

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">🔒 Unauthorized</h1>
          <p className="mb-4">Please login to access the admin panel.</p>
          <a href="/admin/login" className="px-4 py-2 bg-[#2d386a] text-white rounded-full hover:bg-[#1e2a4a] transition">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <AdminNavbar toggleSidebar={handleToggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <div className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} bg-white shadow-lg`}>
            <AdminSidebar collapsed={collapsed} />
          </div>
        )}
        {isMobile && collapsed && (
          <div ref={sidebarRef} className="fixed z-40 w-64 h-full bg-white shadow-xl">
            <AdminSidebar collapsed={false} onLinkClick={handleCloseSidebar} />
          </div>
        )}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50 rounded-tl-xl shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}
