import mongoose from 'mongoose';

const BillItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  name: String,
  qty: Number,
  price: Number,
  line: Number,
}, { _id: false });

const BillSchema = new mongoose.Schema({
  billNumber: {
    type: Number,
    required: true,
  },
  items: [BillItemSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Bill || mongoose.model('Bill', BillSchema);
