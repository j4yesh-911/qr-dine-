const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const router = express.Router();

// register (optional). You can initially create an admin manually or via this
router.post('/register', async (req,res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing' });
  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, role: 'user' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// login
router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid' });
    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return res.status(400).json({ message: 'Invalid' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
