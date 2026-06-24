'use client';

import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/components/ui/Toast';
import Spinner from '@/components/ui/Spinner';
import Pagination from '@/components/ui/Pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function p2(n) { return '₹' + n.toFixed(2); }

export default function AllBillsPage() {
  const showToast = useToast();
  const [bills, setBills] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest_amount, lowest_amount
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, startDate, endDate]);

  useEffect(() => {
    Promise.all([
      fetch('/api/bills?period=all').then(res => res.json()),
      fetch('/api/settings').then(res => res.json())
    ])
    .then(([billsData, settingsData]) => {
      setBills(Array.isArray(billsData) ? billsData : []);
      setSettings(settingsData);
      setLoading(false);
    })
    .catch(() => {
      showToast('Failed to load bills history');
      setLoading(false);
    });
  }, []);

  const downloadBillPDF = (bill) => {
    const doc = new jsPDF();
    const formatCurrency = (n) => 'Rs. ' + n.toFixed(2);
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(232, 82, 122);
    doc.text('INVOICE', 105, 20, null, null, 'center');
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(settings?.shopName || 'ScoopBill Ice Cream Shop', 105, 30, null, null, 'center');

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(settings?.shopAddress || '123 Sweet Street, Dessert City', 105, 35, null, null, 'center');
    
    let currentY = 40;
    if (settings?.phone) {
      doc.text(`Phone: ${settings.phone}`, 105, currentY, null, null, 'center');
      currentY += 5;
    }
    if (settings?.gstNumber) {
      doc.text(`GST: ${settings.gstNumber}`, 105, currentY, null, null, 'center');
      currentY += 5;
    }

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Bill No: #${String(bill.billNumber).padStart(4, '0')}`, 14, currentY + 5);
    doc.text(`Date: ${new Date(bill.createdAt).toLocaleString('en-IN')}`, 196, currentY + 5, null, null, 'right');

    const tableColumn = ['Item', 'Qty', 'Price', 'Total'];
    const tableRows = [];

    bill.items.forEach(item => {
      tableRows.push([
        item.name,
        item.qty.toString(),
        formatCurrency(item.price),
        formatCurrency(item.line),
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: currentY + 12,
      theme: 'striped',
      headStyles: { fillColor: [232, 82, 122] },
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      }
    });

    const finalY = doc.lastAutoTable.finalY || 52;
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text('Subtotal:', 140, finalY + 10);
    doc.text(formatCurrency(bill.subtotal), 196, finalY + 10, null, null, 'right');
    
    doc.text(`Tax:`, 140, finalY + 18);
    doc.text(formatCurrency(bill.tax), 196, finalY + 18, null, null, 'right');
    
    doc.setLineWidth(0.5);
    doc.line(140, finalY + 22, 196, finalY + 22);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Total Amount:', 140, finalY + 30);
    doc.text(formatCurrency(bill.total), 196, finalY + 30, null, null, 'right');
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for your visit!', 105, finalY + 50, null, null, 'center');

    doc.save(`bill_${bill.billNumber}.pdf`);
  };

  const filteredBills = useMemo(() => {
    let result = [...bills];
    
    // Search by Bill Number or Item Name
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b => 
        String(b.billNumber).includes(q) || 
        b.items.some(i => i.name.toLowerCase().includes(q))
      );
    }

    // Date Filters
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      result = result.filter(b => new Date(b.createdAt) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter(b => new Date(b.createdAt) <= end);
    }

    // Sorting
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === 'oldest') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortBy === 'highest_amount') result.sort((a, b) => b.total - a.total);
    else if (sortBy === 'lowest_amount') result.sort((a, b) => a.total - b.total);

    return result;
  }, [bills, search, startDate, endDate, sortBy]);

  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const paginatedBills = filteredBills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div>
        <h1>All Bills 📋</h1>
        <div className="subtitle">View complete billing history with powerful search & filters.</div>
        <Spinner message="Loading bills history..." />
      </div>
    );
  }

  return (
    <div className="fixed-page">
      <div style={{ flexShrink: 0 }}>
        <h1>All Bills 📋</h1>
        <div className="subtitle" style={{ marginBottom: '0.5rem' }}>View complete billing history with powerful search & filters.</div>
      </div>

      <div className="card" style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', padding: '0.75rem' }}>
        <input
          type="text"
          placeholder="Search by Bill # or Item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1 1 250px' }}
        />
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>From:</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          
          <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>To:</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest_amount">Highest Amount</option>
          <option value="lowest_amount">Lowest Amount</option>
        </select>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => { setSearch(''); setStartDate(''); setEndDate(''); setSortBy('newest'); }}
          style={{ padding: '8px 16px' }}
        >
          Clear
        </button>
      </div>

      <div className="card table-scroll" style={{ padding: 0 }}>
        <table className="prod-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Bill #</th>
              <th>Date & Time</th>
              <th>Items Summary</th>
              <th>Total Units</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBills.length > 0 ? paginatedBills.map((b, idx) => (
              <tr key={b._id}>
                <td style={{ fontWeight: 600, color: 'var(--muted)' }}>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td style={{ fontWeight: 700, color: 'var(--pink)' }}>#{String(b.billNumber).padStart(4, '0')}</td>
                <td>
                  <div>{new Date(b.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td>
                  <div style={{ fontSize: '13px' }}>
                    {b.items.map(i => i.name).slice(0, 3).join(', ')}
                    {b.items.length > 3 ? ` +${b.items.length - 3} more` : ''}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{b.units || b.items.reduce((acc, i) => acc + i.qty, 0)}</td>
                <td style={{ fontWeight: 700, fontSize: '15px' }}>{p2(b.total)}</td>
                <td>
                  <button className="edit-btn" onClick={() => downloadBillPDF(b)}>🖨 Print</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                  No bills found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-footer">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
          totalResults={filteredBills.length}
          label={filteredBills.length === 1 ? 'bill' : 'bills'}
        />
      </div>
    </div>
  );
}
