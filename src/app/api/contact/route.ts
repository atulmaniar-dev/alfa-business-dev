// /app/api/contact/route.ts
import clientPromise from '@/app/lib/mongodb';
import { contactSchema } from '@/app/lib/schemas/contactSchema';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // default DB from URI
    const contacts = db.collection('contacts');

    const result = await contacts.insertOne({
      ...parsed.data,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: 'Message saved successfully',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const contacts = db.collection('contacts');

    const messages = await contacts.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
