'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Spinner from '@/components/ui/Spinner';

function p2(n) { return '₹' + n.toFixed(2); }

export default function BillingPage() {
  const showToast = useToast();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');
  const [curCat, setCurCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/settings').then(res => res.json())
    ])
      .then(([prodData, setSettingsData]) => {
        setProducts(Array.isArray(prodData) ? prodData : []);
        setSettings(setSettingsData);
        setLoading(false);
      })
      .catch(() => { showToast('Failed to load data'); setLoading(false); });
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p =>
    (curCat === 'All' || p.category === curCat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartIds = Object.keys(cart).filter(id => cart[id] > 0);
  let subtotal = 0;
  const cartItems = cartIds.map(id => {
    const p = products.find(x => x._id === id);
    if (!p) return null;
    const line = p.price * cart[id];
    subtotal += line;
    return { ...p, qty: cart[id], line };
  }).filter(Boolean);
  const taxRate = settings ? settings.taxRate : 5;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    showToast('Added to cart!');
  };

  const adjustCart = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => setCart({});

  const downloadBillPDF = (billNumber) => {
    const doc = new jsPDF();
    const formatCurrency = (n) => 'Rs. ' + n.toFixed(2);
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(232, 82, 122); // Pink branding color
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
    const billText = billNumber === 'Preview' ? 'PREVIEW' : '#' + String(billNumber).padStart(4, '0');
    doc.text(`Bill No: ${billText}`, 14, currentY + 5);
    doc.text(`Date: ${new Date().toLocaleString('en-IN')}`, 196, currentY + 5, null, null, 'right');

    const tableColumn = ['Item', 'Qty', 'Price', 'Total'];
    const tableRows = [];

    cartItems.forEach(item => {
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
      headStyles: { fillColor: [232, 82, 122] }, // Pink headers
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      }
    });

    const finalY = doc.lastAutoTable.finalY || 52;
    
    // Summary - Aligned to the right
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text('Subtotal:', 140, finalY + 10);
    doc.text(formatCurrency(subtotal), 196, finalY + 10, null, null, 'right');
    
    doc.text(`Tax (${taxRate}%):`, 140, finalY + 18);
    doc.text(formatCurrency(tax), 196, finalY + 18, null, null, 'right');
    
    // Total line
    doc.setLineWidth(0.5);
    doc.line(140, finalY + 22, 196, finalY + 22);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Total Amount:', 140, finalY + 30);
    doc.text(formatCurrency(total), 196, finalY + 30, null, null, 'right');
    
    // Reset font for footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for your visit!', 105, finalY + 50, null, null, 'center');

    doc.save(`bill_${billNumber}.pdf`);
  };

  const generateBill = async () => {
    if (cartIds.length === 0) {
      showToast('Cart is empty!');
      return;
    }

    const items = cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      qty: item.qty,
      price: item.price,
      line: item.line,
    }));

    const units = items.reduce((s, i) => s + i.qty, 0);

    try {
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, subtotal, tax, total, units }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to generate bill');
        return;
      }

      showToast(`Bill #${data.billNumber} generated! Total: ${p2(total)}`);
      downloadBillPDF(data.billNumber);
      setCart({});

      // Refresh products to get updated stock/sold
      const prodRes = await fetch('/api/products');
      const prodData = await prodRes.json();
      setProducts(prodData);
    } catch (err) {
      showToast('Failed to generate bill');
    }
  };

  const printBill = () => {
    if (cartIds.length === 0) {
      showToast('Nothing in cart to print!');
      return;
    }
    showToast('🖨 Printing bill...');
    downloadBillPDF('Preview');
  };

  if (loading) {
    return (
      <div>
        <h1>New Bill 🧾</h1>
        <div className="subtitle">Select items to add to the cart, then generate the bill.</div>
        <Spinner message="Loading products..." />
      </div>
    );
  }

  return (
    <div>
      <h1>New Bill 🧾</h1>
      <div className="subtitle">Select items to add to the cart, then generate the bill.</div>
      <div className="billing-layout">
        {/* LEFT - ITEM SELECTION */}
        <div className="card">
          <div className="search-box">
            <span style={{ fontSize: '14px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="cat-tabs">
            {categories.map(c => (
              <button
                key={c}
                className={`cat-tab ${c === curCat ? 'active' : ''}`}
                onClick={() => setCurCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="item-grid">
            {filtered.map(p => (
              <div key={p._id} className="item-card" onClick={() => addToCart(p._id)}>
                <div className="ic-name">{p.name}</div>
                <div className="ic-cat">{p.category}</div>
                <div className="ic-price">₹{p.price}</div>
                <div className="ic-add">+</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - CART */}
        <div className="card bill-panel">
          <div className="card-head">
            <h2>Cart</h2>
            <button className="btn btn-secondary" onClick={clearCart}>Clear</button>
          </div>
          <div className="bill-items">
            {cartItems.length > 0 ? cartItems.map(item => (
              <div className="bill-row" key={item._id}>
                <div className="bname">{item.name}</div>
                <div className="bqty">
                  <button onClick={(e) => { e.stopPropagation(); adjustCart(item._id, -1); }}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={(e) => { e.stopPropagation(); adjustCart(item._id, 1); }}>+</button>
                </div>
                <div className="bprice">{p2(item.line)}</div>
                <button className="brem" onClick={(e) => { e.stopPropagation(); removeFromCart(item._id); }}>✕</button>
              </div>
            )) : (
              <div className="empty-bill">🛒 Tap any item to add it here</div>
            )}
          </div>
          <div className="bill-summary">
            <div className="bill-line"><span>Subtotal</span><span>{p2(subtotal)}</span></div>
            <div className="bill-line"><span>Tax ({taxRate}%)</span><span>{p2(tax)}</span></div>
            <div className="bill-total"><span>Total</span><span>{p2(total)}</span></div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button className="btn btn-secondary" style={{ flex: 1, fontSize: '13px' }} onClick={printBill}>🖨 Print</button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={generateBill}>Generate Bill</button>
          </div>
        </div>
      </div>
    </div>
  );
}
