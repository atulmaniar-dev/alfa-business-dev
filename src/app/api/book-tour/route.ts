import { NextRequest, NextResponse } from 'next/server';
import { bookTourSchema } from '@/app/lib/schemas/bookTourSchema';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[DEBUG] Incoming request body:', body);

    const validation = bookTourSchema.safeParse(body);

    if (!validation.success) {
      console.log('[DEBUG] Validation failed:', validation.error.flatten());
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('bookings');

    const result = await collection.insertOne({
      ...validation.data,
      createdAt: new Date()
    });

    console.log('[DEBUG] Document inserted with ID:', result.insertedId);

    return NextResponse.json({ message: 'Tour booked successfully' }, { status: 200 });
  } catch (err) {
    console.error('[DEBUG] API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('bookings');

    const bookings = await collection
      .find({})
      .sort({ _id: -1 }) // Latest first
      .toArray();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error('[DEBUG] GET API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('bookings');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    console.log('[DEBUG] Deleted booking ID:', id);

    return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });  
  } catch (error) {
    console.error('[DEBUG] DELETE API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });  
  }
}