const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
