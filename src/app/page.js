'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';
import MetricCard from '@/components/ui/MetricCard';
import Spinner from '@/components/ui/Spinner';

function catPillClass(c) {
  return c === 'Ice Cream' ? 'classic' : c === 'Chips' ? 'premium' : c === 'Cold Drinks' ? 'special' : '';
}

function p2(n) { return '₹' + n.toFixed(2); }

export default function DashboardPage() {
  const showToast = useToast();
  const [analytics, setAnalytics] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [analyticsRes, billsRes] = await Promise.all([
        fetch('/api/analytics?period=day'),
        fetch('/api/bills?period=day'),
      ]);
      const analyticsData = await analyticsRes.json();
      const billsData = await billsRes.json();
      setAnalytics(analyticsData);
      setBills(billsData);
    } catch (err) {
      showToast('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const todayDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();

  if (loading) {
    return (
      <div>
        <h1>Good morning! 🌞</h1>
        <div className="subtitle">Here&apos;s your shop at a glance — {todayDate}</div>
        <Spinner message="Loading dashboard..." />
      </div>
    );
  }

  const weeklyRevenue = analytics?.weeklyRevenue || days.map(d => ({ day: d, revenue: 0 }));
  const weekTotal = weeklyRevenue.reduce((s, w) => s + w.revenue, 0);
  const maxRev = Math.max(...weeklyRevenue.map(w => w.revenue), 1);

  const topItems = (analytics?.productStats || []).filter(p => p.sold > 0).slice(0, 5);
  const categoryMap = analytics?.categoryMap || {};
  const catEntries = Object.entries(categoryMap).filter(([, v]) => v > 0);
  const maxCat = Math.max(...catEntries.map(([, v]) => v), 1);

  return (
    <div>
      <h1>Good morning! 🌞</h1>
      <div className="subtitle">Here&apos;s your shop at a glance — {todayDate}</div>

      {/* METRICS */}
      <div className="metric-row">
        <MetricCard colorClass="pink" label="Today's Revenue" value={`₹${Math.round(analytics?.totalRevenue || 0)}`} delta="↑ from yesterday" />
        <MetricCard label="Bills Today" value={analytics?.totalBills || 0} delta="transactions" deltaColor="var(--muted)" />
        <MetricCard colorClass="mint" label="Units Sold" value={analytics?.totalUnits || 0} delta="scoops & cones" deltaColor="var(--muted)" />
        <MetricCard colorClass="amber" label="This Week" value={`₹${Math.round(weekTotal)}`} delta="total revenue" deltaColor="var(--muted)" />
      </div>

      {/* TOP ITEMS + CHARTS */}
      <div className="grid2">
        <div className="card">
          <div className="card-head">
            <h2>Top Selling Items</h2>
            <span className="badge">Today</span>
          </div>
          <div>
            {topItems.length > 0 ? topItems.map((p, i) => (
              <div className="top-item" key={p._id}>
                <div className="rank">{i + 1}</div>
                <div className="iname">{p.name}</div>
                <div className="istat">{p.sold} sold</div>
                <div className="iprice">₹{Math.round(p.revenue)}</div>
              </div>
            )) : (
              <div style={{ color: 'var(--muted)', fontSize: '13px', padding: '1rem 0' }}>
                No sales yet. Generate your first bill!
              </div>
            )}
          </div>
        </div>
        <div className="card">
          <div className="card-head">
            <h2>Sales by Category</h2>
            <span className="badge mint">Units</span>
          </div>
          <div>
            {catEntries.length > 0 ? catEntries.map(([c, v]) => (
              <div className="bar-row" key={c}>
                <div className="bar-label">{c}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.round(v / maxCat * 100)}%` }} />
                </div>
                <div className="bar-val">{v}</div>
              </div>
            )) : (
              <div style={{ color: 'var(--muted)', fontSize: '13px' }}>No sales yet</div>
            )}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="card-head" style={{ marginBottom: '.5rem' }}>
              <h2>Weekly Revenue</h2>
            </div>
            <div className="revenue-line">
              {weeklyRevenue.map((w, i) => (
                <div
                  key={w.day}
                  className="rev-bar"
                  style={{
                    height: `${Math.max(4, Math.round((w.revenue / maxRev) * 100))}%`,
                    background: i === today ? 'var(--pink)' : '#d4b0bc',
                  }}
                  data-tip={`${w.day}: ₹${Math.round(w.revenue)}`}
                />
              ))}
            </div>
            <div className="rev-labels">
              {weeklyRevenue.map(w => (
                <div className="rev-lbl" key={w.day}>{w.day.slice(0, 1)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RECENT BILLS */}
      <div className="card">
        <div className="card-head">
          <h2>Recent Bills</h2>
          <Link href="/billing" className="btn btn-secondary" style={{ textDecoration: 'none' }}>+ New Bill</Link>
        </div>
        <table className="prod-table">
          <thead>
            <tr><th>Bill #</th><th>Items</th><th>Amount</th><th>Time</th></tr>
          </thead>
          <tbody>
            {bills.length > 0 ? bills.slice(0, 5).map(b => (
              <tr key={b._id}>
                <td style={{ fontWeight: 700, color: 'var(--pink)' }}>#{String(b.billNumber).padStart(4, '0')}</td>
                <td>{b.items.map(i => i.name).slice(0, 2).join(', ')}{b.items.length > 2 ? ` +${b.items.length - 2} more` : ''}</td>
                <td style={{ fontWeight: 700 }}>{p2(b.total)}</td>
                <td style={{ color: 'var(--muted)' }}>{new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)', padding: '1.5rem' }}>
                  No bills yet today. Generate your first bill!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
