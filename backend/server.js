require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");
const paymentRoutes = require("./routes/payment");

const app = express();

// ✅ Basic setup
app.use(express.json());
app.use(cookieParser());

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://qr-dine-8fol.vercel.app",
];

// ✅ Main CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Force correct CORS headers globally (for all responses)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Remove restrictive COOP/COEP headers (for Google OAuth)
app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 4000;

// ✅ Start server & ensure admin exists
connectDB()
  .then(async () => {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        passwordHash: hash,
        role: "admin",
      });
      console.log(`✅ Admin created: ${process.env.ADMIN_EMAIL}`);
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));
