const express = require('express');
const User = require('./models/User');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

// Only admin can access
router.use(authMiddleware, requireRole(['admin']));

// promote/demote a user to staff
router.post('/role', async (req,res) => {
  const { userId, role } = req.body; // role = 'staff' or 'user'
  if (!['staff','user','admin'].includes(role)) return res.status(400).json({ message: 'Bad role' });
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
  res.json(user);
});

module.exports = router;
