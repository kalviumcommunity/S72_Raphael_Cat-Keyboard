const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
require('dotenv').config();

dotenv.config();
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use(cors());

const user = require("./controller/user");
app.use("/api/profile", user);

app.get("/ping", (req, res) => {
  res.send("Ping successful!");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
