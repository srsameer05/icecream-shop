import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bill from '@/lib/models/Bill';
import Product from '@/lib/models/Product';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'day';

    let dateFilter = {};
    const now = new Date();

    if (period === 'day') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      dateFilter = { createdAt: { $gte: startOfDay } };
    } else if (period === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { createdAt: { $gte: startOfWeek } };
    } else if (period === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = { createdAt: { $gte: startOfMonth } };
    }

    const bills = await Bill.find(dateFilter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(bills);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Check stock for all items
    for (const item of body.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });
      }
      if (product.stock < item.qty) {
        return NextResponse.json({ error: `Insufficient stock for ${item.name}!` }, { status: 400 });
      }
    }

    // Get next bill number
    const lastBill = await Bill.findOne().sort({ billNumber: -1 });
    const billNumber = lastBill ? lastBill.billNumber + 1 : 1;

    // Create bill
    const bill = await Bill.create({
      ...body,
      billNumber,
    });

    // Update product sold counts and stock
    for (const item of body.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { sold: item.qty, stock: -item.qty },
      });
    }

    return NextResponse.json(bill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
