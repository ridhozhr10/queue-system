const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");

router.post("/", async (req, res) => {
  try {
    const { name, serviceType } = req.body;
    const counter = await Counter.create({ name });
    res.json(counter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const counters = await Counter.findAll();
    res.json(counters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/first", async (req, res) => {
  try {
    const counter = await Counter.findOne({ order: [["createdAt", "ASC"]] });
    if (!counter) return res.json({ message: "No counters available" });
    res.json(counter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
