const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Ticket = sequelize.define(
  "Ticket",
  {
    queueNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    priorityLevel: {
      type: DataTypes.ENUM("P1", "P2", "P3", "P4"),
      defaultValue: "P4",
    },
    status: {
      type: DataTypes.ENUM("waiting", "called", "completed", "skipped"),
      defaultValue: "waiting",
    },
    counterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Ticket;
