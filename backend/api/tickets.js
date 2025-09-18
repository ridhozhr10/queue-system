const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { sendMessage } = require("../whatsapp");

// Create new ticket
router.post("/", async (req, res) => {
  try {
    const { serviceType, phone } = req.body;
    const count = await Ticket.count();
    const queueNumber = `A${100 + count}`;
    const ticket = await Ticket.create({ queueNumber, serviceType, phone });

    if (phone) {
      await sendMessage(
        phone,
        `Nomor antrian anda ${queueNumber} berhasil dibuat. Silahkan tunggu antrian anda.`
      );
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/status/:id", async (req, res) => {
  try {
    const { status, counterId } = req.body;
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    ticket.status = status;
    ticket.counterId = counterId;
    await ticket.save();

    if (ticket.status === "called" && ticket.phone) {
      await sendMessage(
        ticket.phone,
        `Nomor antrian anda ${ticket.queueNumber} sudah bisa di proses di counter ${counterId}. Silahkan segera menuju counter.`
      );

      const nextTicket = await Ticket.findOne({
        where: { status: "waiting" },
        order: [["createdAt", "ASC"]],
      });

      if (nextTicket && nextTicket.phone) {
        await sendMessage(
          nextTicket.phone,
          `Nomor antrian anda ${nextTicket.queueNumber} sedang menunggu 1 panggilan terakhir. Silahkan bersiap pada counter yg tersedia.`
        );
      }
    }

    if (ticket.status === "skipped" && ticket.phone) {
      await sendMessage(
        ticket.phone,
        `Nomor antrian anda ${ticket.queueNumber} terlewat panggilan. Silahkan ambil nomor antrian baru.`
      );
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/waiting", async (req, res) => {
  try {
    const ticket = await Ticket.findAll({
      where: { status: "waiting" },
      order: [["createdAt", "ASC"]],
    });
    if (!ticket || ticket.length === 0)
      return res.json({ message: "No tickets available" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get next ticket (FIFO for now)
router.get("/next", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      where: { status: "waiting" },
      order: [["createdAt", "ASC"]],
    });
    if (!ticket) return res.json({ message: "No tickets available" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.json({ message: "No tickets available" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
