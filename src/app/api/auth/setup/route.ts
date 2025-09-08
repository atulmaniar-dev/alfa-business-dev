import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { hashPassword } from '@/app/lib/bcrypt';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('alfa_business');
  const admins = await db.collection('admins').find({}).toArray();

  if (admins.length === 0) {
    await db.collection('admins').insertOne({
      email: 'admin@alfa.com',
      password: await hashPassword('admin123'), // default pass
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ created: true });
  }

  return NextResponse.json({ created: false });
}
