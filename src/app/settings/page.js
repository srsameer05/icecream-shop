'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/Toast';

export default function SettingsPage() {
  const showToast = useToast();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    shopName: '',
    shopAddress: '',
    phone: '',
    gstNumber: '',
    taxRate: 5,
    ownerName: '',
    ownerEmail: '',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          shopName: data.shopName || '',
          shopAddress: data.shopAddress || '',
          phone: data.phone || '',
          gstNumber: data.gstNumber || '',
          taxRate: data.taxRate !== undefined ? data.taxRate : 5,
          ownerName: data.ownerName || '',
          ownerEmail: data.ownerEmail || '',
        });
        setLoading(false);
      })
      .catch(() => {
        showToast('Failed to load settings');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name === 'taxRate' ? parseFloat(value) : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to update settings');
      showToast('Settings saved successfully!');
    } catch (err) {
      showToast(err.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Profile & Settings ⚙️</h1>
        <div className="subtitle">Manage shop details, billing config, and admin profile.</div>
        <div className="loading-spinner">Loading settings...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile & Settings ⚙️</h1>
      <div className="subtitle">Manage shop details, billing config, and admin profile.</div>
      
      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSave}>
          <div className="grid2">
            <div className="form-group">
              <label>Shop Name</label>
              <input type="text" name="shopName" value={settings.shopName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Owner Name</label>
              <input type="text" name="ownerName" value={settings.ownerName} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
               <label>Phone Number</label>
               <input type="text" name="phone" value={settings.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="ownerEmail" value={settings.ownerEmail} onChange={handleChange} />
            </div>
            
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Shop Address</label>
              <input type="text" name="shopAddress" value={settings.shopAddress} onChange={handleChange} required />
            </div>
          </div>

          <div className="card-head" style={{ marginTop: '1.5rem', borderTop: '0.5px solid var(--border)', paddingTop: '1rem' }}>
            <h2>Billing & Tax</h2>
          </div>
          <div className="grid2">
            <div className="form-group">
              <label>GST Number (Optional)</label>
              <input type="text" name="gstNumber" value={settings.gstNumber} onChange={handleChange} placeholder="e.g. 29ABCDE1234F1Z5" />
            </div>
            <div className="form-group">
              <label>Default Tax Rate (%)</label>
              <input type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} min="0" step="0.1" required />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '10px 30px' }}>Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
}
