// /app/api/gallery/upload/route.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder")?.toString() || "Gallery";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `Gallery/${folder}`,
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            return reject(error || new Error("Upload failed"));
          }
          resolve(result.secure_url);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({ url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[Upload Error]", error);
      return NextResponse.json({ error: "Upload failed", message: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}
