const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "DELETE", "PUT"]
  }
});

const registerEvents = require("./registerEvents");

const chat = [];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.emit("GET_CHAT", chat);

  socket.on("ADD_MESSAGE", () => {
    chat.push({ message: "asdasd", userId: Math.random() });
    socket.emit("GET_CHAT", chat);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
