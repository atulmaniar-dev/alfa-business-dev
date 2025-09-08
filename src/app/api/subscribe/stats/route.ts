// /app/api/subscriptions/stats/route.ts
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const subscriptions = db.collection("subscriptions");

    const total = await subscriptions.countDocuments();

    return NextResponse.json({ total });
  } catch (error) {
    console.error("Stats GET error:", error);
    return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
  }
}
