const Counter = require("./Counter");
const Ticket = require("./Ticket");

Ticket.belongsTo(Counter, { foreignKey: "counterId" });
Counter.hasMany(Ticket, { foreignKey: "counterId" });
