import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { delta } = await request.json();
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    product.stock = Math.max(0, product.stock + delta);
    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
