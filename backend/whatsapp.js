const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

let isClientReady = false;
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Client is ready!");
  isClientReady = true;
});

client.on("remote_session_saved", () => {
  console.log("WhatsApp session is saved!");
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out:", reason);
  isClientReady = false;
});

async function sendMessage(number, message) {
  if (!isClientReady) {
    console.log("WhatsApp Client is not ready. Cannot send message.");
    return;
  }
  const chatId = number.includes("@c.us") ? number : `${number}@c.us`;
  return client.sendMessage(chatId, message);
}

module.exports = { client, sendMessage };
