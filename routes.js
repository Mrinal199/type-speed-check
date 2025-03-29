const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Session } = require("./models");
const authMiddleware = require("./middleware");

const router = express.Router();

// User Registration
router.post("/api/auth/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered" });
});

// User Login
router.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Generated Token:", token);  

    res.json({ token });
});

// Get User Details
router.get("/api/auth/user", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

// Store Typing Session
router.post("/api/sessions", authMiddleware, async (req, res) => {
    const session = new Session({ ...req.body, userId: req.user.id });
    await session.save();
    res.json({ message: "Session saved" });
});

// Retrieve User Sessions
router.get("/api/sessions/:userId", authMiddleware, async (req, res) => {
    const sessions = await Session.find({ userId: req.params.userId });
    res.json(sessions);
});

module.exports = router;