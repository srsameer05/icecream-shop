'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/Toast';

function catPillClass(c) {
  return c === 'Ice Cream' ? 'classic' : c === 'Chips' ? 'premium' : c === 'Cold Drinks' ? 'special' : '';
}

export default function InventoryPage() {
  const showToast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      showToast('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const updateStock = async (id, delta) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast(`Updated ${data.name} stock to ${data.stock}`);
      fetchProducts();
    } catch (err) {
      showToast(err.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Inventory 📦</h1>
        <div className="subtitle">Track and manage stock levels for all products.</div>
        <div className="loading-spinner">Loading inventory...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Inventory 📦</h1>
      <div className="subtitle">Track and manage stock levels for all products.</div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="prod-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td><span className={`cat-pill ${catPillClass(p.category)}`}>{p.category}</span></td>
                <td style={{ fontWeight: 700 }}>{p.stock}</td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="edit-btn" onClick={() => updateStock(p._id, 1)}>+ Add</button>
                  <button className="edit-btn" onClick={() => updateStock(p._id, -1)}>- Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
