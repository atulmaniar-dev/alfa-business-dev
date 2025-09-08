import clientPromise from "@/app/lib/mongodb";
import { bookTourSchema } from "@/app/lib/schemas/bookTourSchema";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, context: any) {
  try {
    const id = context.params?.id;
    if (!id) {
      return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });
    }

    const body = await req.json();
    const validation = bookTourSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("alfa_business");
    const collection = db.collection("bookings");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...validation.data, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking updated successfully" });
  } catch (err) {
    console.error("[PUT] Error updating booking:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  try {
    const id = context.params?.id;
    const client = await clientPromise;
    const db = client.db("alfa_business");
    const booking = await db.collection("bookings").findOne({ _id: new ObjectId(id) });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("[GET BOOKING ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
