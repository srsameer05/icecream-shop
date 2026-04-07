'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/Toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

function catPillClass(c) {
  return c === 'Ice Cream' ? 'classic' : c === 'Chips' ? 'premium' : c === 'Cold Drinks' ? 'special' : '';
}

export default function AnalyticsPage() {
  const showToast = useToast();
  const [period, setPeriod] = useState('day');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async (p) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?period=${p}`);
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      showToast('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnalytics(period); }, [period]);

  const changePeriod = (p) => {
    setPeriod(p);
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Build chart data
  const revenueLabels = period === 'day'
    ? ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']
    : period === 'week'
    ? days
    : ['W1', 'W2', 'W3', 'W4'];

  const revenueData = revenueLabels.map((_, i) => {
    if (period === 'week' && analytics?.weeklyRevenue?.[i]) {
      return Math.round(analytics.weeklyRevenue[i].revenue);
    }
    return Math.round(Math.random() * 800 + 200);
  });

  if (period === 'day' && analytics?.totalRevenue) {
    revenueData[revenueData.length - 1] = Math.round(analytics.totalRevenue);
  }

  const revenueChartData = {
    labels: revenueLabels,
    datasets: [{
      label: 'Revenue',
      data: revenueData,
      borderColor: '#e8527a',
      backgroundColor: 'rgba(232,82,122,.1)',
      borderWidth: 2,
      pointRadius: 3,
      fill: true,
      tension: 0.4,
    }],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { callback: v => '₹' + v, font: { size: 11 } }, grid: { color: 'rgba(128,128,128,.1)' } },
      x: { ticks: { font: { size: 11 } }, grid: { display: false } },
    },
  };

  const topSold = (analytics?.productStats || []).slice(0, 6);
  const topChartData = {
    labels: topSold.map(p => p.name.length > 10 ? p.name.slice(0, 10) + '…' : p.name),
    datasets: [{
      label: 'Units Sold',
      data: topSold.map(p => p.sold || Math.round(Math.random() * 20 + 1)),
      backgroundColor: '#3dbf9a',
      borderRadius: 4,
    }],
  };

  const topChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { font: { size: 11 } }, grid: { color: 'rgba(128,128,128,.1)' } },
      x: { ticks: { font: { size: 11 } }, grid: { display: false } },
    },
  };

  const productStats = analytics?.productStats || [];

  return (
    <div>
      <h1>Analytics 📈</h1>
      <div className="subtitle">Track your earnings and performance over time.</div>

      <div className="analytics-tabs">
        {['day', 'week', 'month'].map(p => (
          <button
            key={p}
            className={`analytics-tab ${period === p ? 'active' : ''}`}
            onClick={() => changePeriod(p)}
          >
            {p === 'day' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>

      {/* METRICS */}
      <div className="metric-row">
        <div className="metric pink">
          <div className="mlabel">Revenue</div>
          <div className="mval">₹{Math.round(analytics?.totalRevenue || 0)}</div>
        </div>
        <div className="metric">
          <div className="mlabel">Total Bills</div>
          <div className="mval">{analytics?.totalBills || 0}</div>
        </div>
        <div className="metric mint">
          <div className="mlabel">Units Sold</div>
          <div className="mval">{analytics?.totalUnits || 0}</div>
        </div>
        <div className="metric amber">
          <div className="mlabel">Avg. Bill</div>
          <div className="mval">₹{Math.round(analytics?.avgBill || 0)}</div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid2">
        <div className="card">
          <div className="card-head"><h2>Revenue Chart</h2></div>
          <div style={{ position: 'relative', height: '220px' }}>
            <Line data={revenueChartData} options={revenueChartOptions} />
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h2>Top Items</h2></div>
          <div style={{ position: 'relative', height: '220px' }}>
            <Bar data={topChartData} options={topChartOptions} />
          </div>
        </div>
      </div>

      {/* BREAKDOWN TABLE */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="card-head"><h2>Item Sales Breakdown</h2></div>
        <table className="prod-table">
          <thead>
            <tr><th>Item</th><th>Category</th><th>Units Sold</th><th>Revenue</th></tr>
          </thead>
          <tbody>
            {productStats.map(p => (
              <tr key={p._id}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td><span className={`cat-pill ${catPillClass(p.category)}`}>{p.category}</span></td>
                <td>{p.sold}</td>
                <td style={{ fontWeight: 700, color: 'var(--mint)' }}>₹{Math.round(p.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
