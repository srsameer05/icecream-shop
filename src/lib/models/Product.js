import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Ice Cream', 'Chips', 'Cold Drinks'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  sold: {
    type: Number,
    default: 0,
    min: 0,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
