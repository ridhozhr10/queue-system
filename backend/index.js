const express = require("express");
const app = express();
const sequelize = require("./utils/db");
const ticketsRouter = require("./api/tickets");
const cors = require("cors");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/tickets", ticketsRouter);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Queue system running on port ${PORT}`));
});
