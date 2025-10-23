const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableId: { type: String, required: true, unique: true }, // e.g., TABLE_1
  name: String, // e.g., "Table 1"
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Table', tableSchema);
