const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

// Place an order
router.post('/', authMiddleware, async (req,res) => {
  const { tableId, items } = req.body; // items = [{ itemId, qty }]
  if (!tableId || !items?.length) return res.status(400).json({ message: 'Bad' });

  // fetch prices
  const itemDocs = await MenuItem.find({ _id: { $in: items.map(i=>i.itemId) } });
  const itemsForOrder = items.map(i => {
    const doc = itemDocs.find(d => d._id.equals(i.itemId));
    return { item: i.itemId, qty: i.qty, priceAtOrder: doc.price };
  });
  const total = itemsForOrder.reduce((s,it)=>s + it.qty * it.priceAtOrder, 0);

  const order = await Order.create({
    tableId, items: itemsForOrder, total, placedBy: req.user._id
  });
  res.json(order);
});

// staff/admin fetch orders
router.get('/', authMiddleware, requireRole(['staff','admin']), async (req,res) => {
  const orders = await Order.find().populate('items.item').sort({ createdAt: -1 });
  res.json(orders);
});

// update status (staff)
router.patch('/:id/status', authMiddleware, requireRole(['staff','admin']), async (req,res) => {
  const { status } = req.body;
  const allowed = ['placed','preparing','ready','served','billed','cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ message: 'Bad status' });
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('items.item');
  res.json(order);
});

module.exports = router;
