import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  shopName: { type: String, default: 'ScoopBill Ice Cream Shop' },
  shopAddress: { type: String, default: '123 Sweet Street, Dessert City' },
  phone: { type: String, default: '+91 9876543210' },
  gstNumber: { type: String, default: '' },
  taxRate: { type: Number, default: 5 },
  ownerName: { type: String, default: 'Admin' },
  ownerEmail: { type: String, default: 'admin@scoopbill.com' }
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
