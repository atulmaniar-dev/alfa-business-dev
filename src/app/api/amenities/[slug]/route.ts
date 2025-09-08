import cloudinary from '@/app/lib/cloudinary';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse, type NextRequest } from 'next/server';

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('amenities');

    const amenity = await collection.findOne({ _id: new ObjectId(slug) });

    if (!amenity) {
      return NextResponse.json({ error: 'Amenity not found' }, { status: 404 });
    }

    return NextResponse.json(amenity);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Error fetching amenity' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;
    const formData = await request.formData();
    
    const amenitiesName = formData.get('amenitiesName')?.toString();
    const tag = formData.get('tag')?.toString();
    const description = formData.get('description')?.toString();
    const imageFile = formData.get('image') as File | null;

    if (!amenitiesName || !tag || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const updatedFields: {
      amenitiesName: string;
      tag: string;
      description: string;
      updatedAt: string;
      image?: string[];
    } = {
      amenitiesName,
      tag,
      description,
      updatedAt: new Date().toISOString(),
    };

    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'amenities' },
            (err, result) => {
              if (err || !result) return reject(err);
              resolve(result);
            }
          ).end(buffer);
        }
      );

      updatedFields.image = [uploadResult.secure_url];
    }

    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('amenities');

    const result = await collection.updateOne(
      { _id: new ObjectId(slug) },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Amenity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Amenity updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('amenities');

    const amenity = await collection.findOne({ _id: new ObjectId(slug) });

    if (!amenity) {
      return NextResponse.json(
        { error: 'Amenity not found' },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    if (Array.isArray(amenity.image)) {
      await Promise.all(
        amenity.image.map(async (url: string) => {
          const publicId = url.split('/').pop()?.split('.')[0];
          if (publicId) {
            try {
              await cloudinary.uploader.destroy(`amenities/${publicId}`);
            } catch (err) {
              console.warn('Cloudinary delete failed:', publicId, err);
            }
          }
        })
      );
    }

    // Delete from DB
    await collection.deleteOne({ _id: new ObjectId(slug) });

    return NextResponse.json(
      { message: 'Amenity deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}