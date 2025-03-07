const express = require("express");
const router = express.Router();
const User = require("../model/user"); // Import User model

// ✅ POST: Create a new user
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ GET: Fetch user profile by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ PUT: Update user profile by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
