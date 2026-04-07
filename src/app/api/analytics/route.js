import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bill from '@/lib/models/Bill';
import Product from '@/lib/models/Product';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'day';

    const now = new Date();
    let dateFilter = {};

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

    const bills = await Bill.find(dateFilter);
    const products = await Product.find({});

    const totalRevenue = bills.reduce((sum, b) => sum + b.total, 0);
    const totalUnits = bills.reduce((sum, b) => sum + b.units, 0);
    const totalBills = bills.length;
    const avgBill = totalBills > 0 ? totalRevenue / totalBills : 0;

    // Weekly revenue data (last 7 days)
    const weeklyRevenue = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      const dayOfWeek = now.getDay();
      date.setDate(now.getDate() - dayOfWeek + i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const dayBills = bills.filter(b => {
        const bDate = new Date(b.createdAt);
        return bDate >= date && bDate < nextDate;
      });
      weeklyRevenue.push({
        day: days[i],
        revenue: dayBills.reduce((s, b) => s + b.total, 0),
      });
    }

    // Product performance
    const productStats = products.map(p => ({
      _id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      sold: p.sold,
      revenue: p.price * p.sold,
    })).sort((a, b) => b.sold - a.sold);

    // Category breakdown
    const categoryMap = {};
    products.forEach(p => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + p.sold;
    });

    return NextResponse.json({
      totalRevenue,
      totalUnits,
      totalBills,
      avgBill,
      weeklyRevenue,
      productStats,
      categoryMap,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
