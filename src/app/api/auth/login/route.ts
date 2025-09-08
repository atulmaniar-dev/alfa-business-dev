import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { comparePassword } from '@/app/lib/bcrypt';
import { signToken } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db('alfa_business');
  const admin = await db.collection('admins').findOne({ email });

  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 401 });

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = signToken({ email });
  const res = NextResponse.json({ message: 'Logged in' });

  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });

  return res;
}
