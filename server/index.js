const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "DELETE", "PUT"]
  }
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const Room = require("./classes/Room");
const User = require("./classes/User");
const Server = require("./classes/Server.js");
const Roulette = require("./classes/Roulette.js");

const user = new User(io);
const room = new Room(io);
const roulette = new Roulette({ io, user });
const server = new Server({
  io,
  roulette,
  user,
  room
});

server.connection();
roulette.init();

http.listen(3000, () => {
  console.log("listening on *:3000");
});
