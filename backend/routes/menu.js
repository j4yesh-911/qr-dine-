const express = require('express');
const MenuItem = require('../models/MenuItem');
const { authMiddleware, requireRole } = require('../middleware/auth');
const router = express.Router();

// Get all available items
router.get('/', async (req, res) => {
  try {
   const items = await MenuItem.find().lean();

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new menu item (admin only)
router.post('/', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      image,
      available: available !== undefined ? available : true
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
