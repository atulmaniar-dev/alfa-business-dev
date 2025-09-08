import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { planSchema } from '@/app/lib/schemas/planSchema';
import cloudinary from '@/app/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('plans');

    const plans = await collection.find({}).toArray();
    return NextResponse.json(plans, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch plans', details: err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const monthlyPrice = Number(formData.get('monthlyPrice'));
    const yearlyPrice = Number(formData.get('yearlyPrice'));
    const available = formData.get('available') === 'true';
    const description = formData.get('description') as string | null;

    const monthlyFeatures = JSON.parse(formData.get('monthlyFeatures') as string);
    const yearlyFeatures = JSON.parse(formData.get('yearlyFeatures') as string);
    const popular = formData.get('popular') === 'true';
    const files = formData.getAll('images') as File[];

    if (files.length > 5) {
      return NextResponse.json({ error: 'Max 5 images allowed' }, { status: 400 });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('plans');

    // Check for duplicate slug
    const existing = await collection.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: 'A plan with a similar title already exists. Please try a different title.' },
        { status: 409 } // Conflict
      );
    }

    // Upload images
    const imageUrls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'plans' }, (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          })
          .end(buffer);
      });

      imageUrls.push(uploadRes.secure_url);
    }

    // Validate using schema (without slug)
    const parsed = planSchema.parse({
      title,
      monthlyPrice,
      yearlyPrice,
      available,
      monthlyFeatures,
      yearlyFeatures,
      images: imageUrls,
      description,
      popular,
      createdAt: new Date().toISOString(),
    });

    // Insert with generated slug
    const result = await collection.insertOne({
      ...parsed,
      slug,
    });

    return NextResponse.json({ _id: result.insertedId, ...parsed, slug }, { status: 201 });

  } catch (err: unknown) {
    console.error('[PLAN POST ERROR]', err);
    return NextResponse.json(
      { error: 'Upload or DB error', details: (err as Error).message },
      { status: 500 }
    );
  }
}

