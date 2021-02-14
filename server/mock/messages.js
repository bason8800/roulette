const messages = [
  { message: "message 1" },
  { message: "message 2" },
  { message: "message 3" },
  { message: "message 4" },
  { message: "message 5" },
  { message: "message 6" },
  { message: "message 7" },
  { message: "message 8" },
  { message: "message 9" },
  { message: "message 10" },
  { message: "message 11" }
];

module.exports = messages.map((message, idx) => ({
  ...message,
  userId: idx + 1
}));
