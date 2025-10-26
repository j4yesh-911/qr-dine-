const express = require("express");
const User = require("../models/User");
const { authMiddleware, requireRole } = require("../middleware/auth");

const router = express.Router();

// 🔒 Only admin can access
router.use(authMiddleware, requireRole(["admin"]));

/**
 * 📋 Get all users
 * GET /api/admin/users
 */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash"); // don’t send hashed passwords
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

/**
 * 🔁 Update user role
 * PUT /api/admin/users/:id/role
 * Body: { role: "user" | "staff" | "admin" }
 */
router.put("/users/:id/role", async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ["user", "staff", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-passwordHash");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating role" });
  }
});

module.exports = router;
