const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Counter = sequelize.define(
  "Counter",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isReady: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

module.exports = Counter;
