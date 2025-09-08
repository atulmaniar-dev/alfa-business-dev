import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  const isProtectedAdminRoute =
    pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');

  if (isProtectedAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
      verifyToken(token); // Throws error if invalid
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
