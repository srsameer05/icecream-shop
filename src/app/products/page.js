'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/Toast';
import Modal from '@/components/Modal';

function catPillClass(c) {
  return c === 'Ice Cream' ? 'classic' : c === 'Chips' ? 'premium' : c === 'Cold Drinks' ? 'special' : '';
}

export default function ProductsPage() {
  const showToast = useToast();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      showToast('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update');
        showToast('Item updated!');
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to add');
        showToast('Item added!');
      }
      setModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      showToast(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      showToast('Item deleted.');
      fetchProducts();
    } catch (err) {
      showToast(err.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Products 🍨</h1>
        <div className="subtitle">Manage your ice cream menu — add, edit, or remove items.</div>
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Products 🍨</h1>
      <div className="subtitle">Manage your ice cream menu — add, edit, or remove items.</div>
      <div className="products-toolbar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openAddModal}>
          + Add Item
        </button>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="prod-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Sold Today</th>
              <th>Remaining Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td><span className={`cat-pill ${catPillClass(p.category)}`}>{p.category}</span></td>
                <td style={{ fontWeight: 700 }}>₹{p.price}</td>
                <td>{p.sold}</td>
                <td style={{ fontWeight: 600 }}>{p.stock}</td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="edit-btn" onClick={() => openEditModal(p)}>Edit</button>
                  <button className="del-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditingProduct(null); }}
          onSave={handleSave}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
}
