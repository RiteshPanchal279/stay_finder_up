const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already exists with this email",
        success: false 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    
    res.status(201).json({ 
      message: "User registered successfully", 
      success: true 
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ 
        message: "Invalid credentials",
        success: false 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Invalid credentials",
        success: false 
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Extended to 7 days
    });
    
    res.json({
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      },
      success: true,
      message: "Login successful"
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
});

// Get current user (protected route)
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user, success: true });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;