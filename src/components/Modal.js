'use client';

import { useState } from 'react';

export default function Modal({ isOpen, onClose, onSave, editingProduct }) {
  const isEditing = !!editingProduct;

  const [name, setName] = useState(editingProduct?.name || '');
  const [category, setCategory] = useState(editingProduct?.category || 'Ice Cream');
  const [price, setPrice] = useState(editingProduct?.price || '');
  const [stock, setStock] = useState(editingProduct?.stock || '');

  // Reset form when modal opens with new data
  useState(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
    } else {
      setName('');
      setCategory('Ice Cream');
      setPrice('');
      setStock('');
    }
  }, [editingProduct]);

  const handleSave = () => {
    if (!name.trim() || !price) return;
    onSave({
      name: name.trim(),
      category,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{isEditing ? 'Edit Item' : 'Add New Item'}</h3>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            placeholder="e.g. Mango Sorbet"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Ice Cream">Ice Cream</option>
            <option value="Chips">Chips</option>
            <option value="Cold Drinks">Cold Drinks</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Starting Stock</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="modal-btns">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
