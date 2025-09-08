import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import cloudinary from '@/app/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("alfa_business");
    const collection = db.collection("amenities");

    const amenities = await collection.find({}).toArray();

    const formatted = amenities.map(item => ({
      _id: item._id.toString(),
      amenitiesName: item.amenitiesName,
      tag: item.tag,
      description: item.description,
      image: item.image,
      creditedAt: item.creditedAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch amenities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const amenitiesName = formData.get('amenitiesName') as string;
    const tag = formData.get('tag') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    if (!amenitiesName || !tag || !description || !imageFile) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'amenities' }, (err, result) => {
        if (err || !result?.secure_url) {
          return reject(err || new Error('Upload failed'));
        }
        resolve({ secure_url: result.secure_url });
      }).end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('amenities');

    const newAmenity = {
      amenitiesName,
      tag,
      description,
      image: [imageUrl], // save as array
      creditedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const insertResult = await collection.insertOne(newAmenity);

    return NextResponse.json(
      { message: 'Amenity added', insertedId: insertResult.insertedId },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('POST /api/amenities error:', err);

    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';

    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }
}
