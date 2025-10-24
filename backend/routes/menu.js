const express = require('express');
const MenuItem = require('../models/MenuItem');
const { authMiddleware, requireRole } = require('../middleware/auth');
const router = express.Router();

// ✅ Get all available items (already there)
router.get('/', async (req, res) => {
  const items = await MenuItem.find({ available: true }).lean();
  res.json(items);
});

// ✅ Add a new menu item (admin only)
router.post('/', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const { name, desc, price, category, image, available } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const item = await MenuItem.create({
      name,
      desc,
      price,
      category,
      image,
      available
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
