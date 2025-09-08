import cloudinary from "@/app/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  // Extract public_id from URL
  const parts = imageUrl.split('/');
  const filename = parts[parts.length - 1];
  const publicId = 'amenities/' + filename.split('.')[0];

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete from Cloudinary' }, { status: 500 });
  }
}