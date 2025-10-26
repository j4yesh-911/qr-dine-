const express = require("express");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const { authMiddleware, requireRole } = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

// 🧾 Place an order
router.post("/", authMiddleware, async (req, res) => {
  const { tableId, items } = req.body; // items = [{ itemId, qty }]
  if (!tableId || !items?.length)
    return res.status(400).json({ message: "Invalid order data" });

  try {
    // fetch item prices from DB
    const itemDocs = await MenuItem.find({
      _id: { $in: items.map((i) => i.itemId) },
    });

    const itemsForOrder = items.map((i) => {
      const doc = itemDocs.find((d) => d._id.equals(i.itemId));
      return { item: i.itemId, qty: i.qty, priceAtOrder: doc.price };
    });

    const total = itemsForOrder.reduce(
      (sum, it) => sum + it.qty * it.priceAtOrder,
      0
    );

    const order = await Order.create({
      tableId,
      items: itemsForOrder,
      total,
      placedBy: req.user._id,
      status: "placed",
    });

    res.json(order);
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Error placing order" });
  }
});

// 📦 Staff/Admin fetch all orders
router.get("/", authMiddleware, requireRole(["staff", "admin"]), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.item")
      .populate("placedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// 🔁 Update order status
router.patch("/:id/status", authMiddleware, requireRole(["staff", "admin"]), async (req, res) => {
  const { status } = req.body;
  const allowed = [
    "placed",
    "preparing",
    "ready",
    "served",
    "billed",
    "cancelled",
  ];
  if (!allowed.includes(status))
    return res.status(400).json({ message: "Invalid status" });

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("items.item");
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating status" });
  }
});

// 👤 Fetch orders of logged-in user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ placedBy: req.user._id })
      .populate("items.item")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 💳 Generate UPI Payment QR for bill
router.post("/generate-upi", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const upiId = process.env.UPI_ID; // admin's UPI from .env
    const payeeName = "QR Dine Restaurant";
    const note = "Restaurant Payment";

    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    res.json({ upiString });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating UPI link" });
  }
});

module.exports = router;
