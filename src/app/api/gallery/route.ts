import { NextRequest, NextResponse } from "next/server";
import { GallerySchema } from "@/app/lib/schemas/gallerySchema";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = GallerySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
    }

    const { imageType, images } = parsed.data;
    const now = new Date().toISOString();

    const newGallery = {
      imageType,
      images,
      createdAt: now,
      updatedAt: now,
    };

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("galleries").insertOne(newGallery);

    return NextResponse.json({ message: "Gallery saved", galleryId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const galleries = await db.collection("galleries").find().toArray();

    return NextResponse.json(galleries, { status: 200 });
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch galleries." }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const { id, image } = await req.json();
    if (!id || !image) {
      return NextResponse.json({ error: "Gallery ID and image are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("galleries").updateOne(
      { _id: new ObjectId(id) },
      { $pull: { images: image }, $set: { updatedAt: new Date().toISOString() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Image not found or already removed" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image removed from gallery" }, { status: 200 });
  } catch (error) {
    console.error("Gallery PUT error:", error);
    return NextResponse.json({ error: "Failed to update gallery." }, { status: 500 });
  }
}

