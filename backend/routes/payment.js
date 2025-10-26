const express = require("express");
const QRCode = require("qrcode");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.post("/generate-upi", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const upiId = process.env.UPI_ID;
    const upiString = `upi://pay?pa=${upiId}&pn=QR Dine Restaurant&am=${amount}&cu=INR&tn=Food Order Payment`;
    const qrImage = await QRCode.toDataURL(upiString);

    res.json({ upiString, qrImage });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate UPI QR" });
  }
});

module.exports = router;
