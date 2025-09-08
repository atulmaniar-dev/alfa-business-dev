import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/app/lib/cloudinary';

type CloudinaryUploadResult = {
  secure_url: string;
};

interface TestimonialUpdateData {
  name?: string;
  email?: string;
  title?: string;
  message?: string;
  status?: string;
  image?: string;
}

// Next.js 15 compatible route handler context
interface RouteHandlerContext {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: RouteHandlerContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const testimonial = await db
      .collection('testimonials')
      .findOne({ _id: new ObjectId(id) });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (err) {
    console.error('[GET Error]', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteHandlerContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const formData = await request.formData();
    const updateData: TestimonialUpdateData = {};

    // Process form data with proper type checking
    const stringFields: (keyof TestimonialUpdateData)[] = ['name', 'email', 'title', 'message', 'status'];
    for (const field of stringFields) {
      const value = formData.get(field);
      if (value) {
        updateData[field] = value.toString();
      }
    }

    // Handle image upload
    const imageFile = formData.get('image');
    if (imageFile instanceof File) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'testimonials' },
          (error, result) => error || !result ? reject(error) : resolve(result)
        ).end(buffer);
      });

      updateData.image = uploaded.secure_url;
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('testimonials').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[PUT Error]', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteHandlerContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('testimonials')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE Error]', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}