const express = require("express");
const app = express();
const sequelize = require("./utils/db");
const ticketsRouter = require("./api/tickets");
const counterRouter = require("./api/counter");
const cors = require("cors");

const { client: whatsappClient, sendMessage } = require("./whatsapp");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/tickets", ticketsRouter);
app.use("/counter", counterRouter);

app.get("/testwa", async (req, res) => {
  await sendMessage("6281283354153", "Test message from Queue System");
  res.send(
    "WhatsApp Client Status: " +
      (whatsappClient.info ? "Connected" : "Not Connected")
  );
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  require("./models/associations");
  whatsappClient.initialize();
  app.listen(PORT, () => console.log(`Queue system running on port ${PORT}`));
});
