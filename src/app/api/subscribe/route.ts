import clientPromise from "@/app/lib/mongodb";
import { SubscribeSchema } from "@/app/lib/schemas/subscribeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = SubscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // default DB from URI
    const subscriptions = db.collection('subscriptions');

    const result = await subscriptions.insertOne({
      ...parsed.data,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: 'Subscription saved successfully',
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
    const subscriptions = db.collection('subscriptions');

    const subs = await subscriptions.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ subscriptions: subs });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}