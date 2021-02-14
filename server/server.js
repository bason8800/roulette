const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "DELETE", "PUT"]
  }
});

const chat = require("./messages");
const rooms = require("./rooms");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

io.on("connection", socket => {
  socket.emit("GET_CHAT", chat);
  socket.emit("GET_ROOMS_LIST", rooms);
  socket.emit("GET_ROOM", rooms[0]);

  socket.on("ADD_MESSAGE", data => {
    chat.push(data);
    socket.emit("GET_CHAT", chat);
  });
});
