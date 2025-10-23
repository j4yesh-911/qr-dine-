const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      qty: { type: Number, default: 1 },
      priceAtOrder: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    enum: ['placed','preparing','ready','served','billed','cancelled'],
    default: 'placed'
  },
  placedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  billed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Order', orderSchema);
