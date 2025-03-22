const express = require("express");
const router = express.Router();
const User = require("../model/user"); // Import User model

// Login endpoint
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Simple password check (in a real app, you should use bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ POST: Create a new user
router.post("/", async (req, res) => {
    try {
        const { name, email, password, image } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        const newUser = new User({ name, email, password, image});
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
// ✅ GET: Fetch all user profiles
router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
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

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
