'use client';

import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import Pagination from '@/components/ui/Pagination';

function catPillClass(c) {
  return c === 'Ice Cream' ? 'classic' : c === 'Chips' ? 'premium' : c === 'Cold Drinks' ? 'special' : '';
}

export default function ProductsPage() {
  const showToast = useToast();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [curCat, setCurCat] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, curCat, sortBy]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCat = curCat === 'All' || p.category === curCat;
      return matchesSearch && matchesCat;
    });

    result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'stock_asc') return a.stock - b.stock;
      if (sortBy === 'stock_desc') return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [products, search, curCat, sortBy]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <h1>Inventory 📦</h1>
        <div className="subtitle">Manage your ice cream menu — add, edit, or remove items.</div>
        <Spinner message="Loading products..." />
      </div>
    );
  }

  return (
    <div className="fixed-page">
      <div style={{ flexShrink: 0 }}>
        <h1>Inventory 📦</h1>
        <div className="subtitle" style={{ marginBottom: '0.5rem' }}>Manage your ice cream menu — add, edit, or remove items.</div>
      </div>
      <div className="card" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="search-box" style={{ margin: 0, flex: '1 1 300px', maxWidth: '450px' }}>
            <span style={{ fontSize: '14px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search inventory by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '4px 0' }}
            />
          </div>
          <button className="btn btn-primary" style={{ width: 'auto', margin: 0, padding: '10px 24px', borderRadius: '10px' }} onClick={openAddModal}>
            + Add Item
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', background: 'var(--surface)', padding: '10px', borderRadius: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', paddingLeft: '6px', marginRight: '4px' }}>Filters:</span>
          
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0 8px', transition: ' border-color .15s' }}>
            <span style={{ fontSize: '13px' }}>📂</span>
            <select 
              value={curCat} 
              onChange={(e) => setCurCat(e.target.value)} 
              style={{ padding: '8px 6px', border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}
            >
              {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0 8px', transition: 'border-color .15s' }}>
            <span style={{ fontSize: '13px' }}>↕️</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              style={{ padding: '8px 6px', border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}
            >
              <option value="name">Sort A-Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock_asc">Stock: Low to High</option>
              <option value="stock_desc">Stock: High to Low</option>
            </select>
          </div>

          {(search || curCat !== 'All' || sortBy !== 'name') && (
            <button 
              onClick={() => { setSearch(''); setCurCat('All'); setSortBy('name'); }}
              style={{ background: 'var(--pink-light)', border: 'none', color: 'var(--pink-dark)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', padding: '6px 12px', borderRadius: '20px', marginLeft: '6px', transition: 'all .15s' }}
            >
              ✕ Clear
            </button>
          )}

          <div style={{ flex: 1 }}></div>
        </div>
      </div>
      <div className="card table-scroll" style={{ padding: 0 }}>
        <table className="prod-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Sold Today</th>
              <th>Remaining Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map((p, idx) => (
              <tr key={p._id}>
                <td style={{ fontWeight: 600, color: 'var(--muted)' }}>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
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
            )) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>No items found.</td>
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
          totalResults={filtered.length}
          label={filtered.length === 1 ? 'product' : 'products'}
        />
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
