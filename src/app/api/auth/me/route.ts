// /app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;

  if (!token) return NextResponse.json({ isLoggedIn: false });

  try {
    const decoded = verifyToken(token);
    return NextResponse.json({ isLoggedIn: true, user: decoded });
  } catch {
    return NextResponse.json({ isLoggedIn: false });
  }
}
