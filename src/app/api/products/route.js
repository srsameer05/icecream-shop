import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import defaultProducts from '@/lib/seed';

export async function GET() {
  try {
    await dbConnect();
    let products = await Product.find({}).sort({ createdAt: 1 }).lean();

    // Seed default products if DB is empty
    if (products.length === 0) {
      const inserted = await Product.insertMany(defaultProducts);
      products = inserted.map(doc => doc.toObject());
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
