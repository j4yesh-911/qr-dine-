const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

router.get('/', async (req,res) => {
  const items = await MenuItem.find({ available: true }).lean();
  res.json(items);
});

// admin-only endpoints to create/update items can be added.
module.exports = router;
