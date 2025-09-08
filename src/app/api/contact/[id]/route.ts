// /app/api/contact/[id]/route.ts
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Modified interface to match Next.js 15's expectations
interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params; // Await the params promise
    const body = await request.json();

    if (!id || !body.status) {
      return NextResponse.json(
        { error: 'Missing ID or status' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const contacts = db.collection('contacts');

    const result = await contacts.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: body.status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Status updated' });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params; // Await the params promise
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const contacts = db.collection('contacts');

    const result = await contacts.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}