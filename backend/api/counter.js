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

router.patch("/:id/active", async (req, res) => {
  try {
    await Counter.update({ isReady: false }, { where: { isReady: true } });

    const counter = await Counter.findByPk(req.params.id);
    if (!counter)
      return res
        .status(201)
        .json({ message: "Counter not found, deactivating all counter" });
    counter.isReady = true;
    await counter.save();
    res.json(counter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const withStatus = req.query.withStatus === "true";
  try {
    const counters = await Counter.findAll();
    if (withStatus) {
      for (const [i, counter] of counters.entries()) {
        const activeTickets = await counter.getTickets({
          where: { status: "called" },
        });
        if (activeTickets.length > 0) {
          counters[i] = {
            ...counters[i].toJSON(),
            status: "busy",
            currentTicket: activeTickets[0],
          };
        }
      }
    }

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
