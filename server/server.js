const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "DELETE", "PUT"]
  }
});

const users = require("./mock/users");
const rooms = require("./mock/rooms");
const mainData = require("./mock/mainData");

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

const getRoomById = id => rooms.find(room => id === room.id);

const emitUserAndRoom = (socket, roomId = 1) => {
  const num = users.length + 1;
  const user = { id: num, name: `New User ${num}`, level: num, avatar: "" };
  const room = getRoomById(roomId);

  users.push(user);

  room.users.push(users[users.length - 1]);

  socket.emit("GET_USER", { ...user, balance: 10000 });
  socket.emit("GET_ROOM", room);
};

io.on("connection", socket => {
  emitUserAndRoom(socket);

  socket.emit("GET_ROOMS_LIST", rooms);
  socket.emit("GET_MAIN_DATA", mainData);

  socket.on("ADD_MESSAGE", ({ roomId, data }) => {
    const room = getRoomById(roomId);

    room.messagesList.push(data);

    io.emit("GET_ROOM", room);
  });

  socket.on("CHANGE_ROOM", id => {
    socket.emit(
      "GET_ROOM",
      rooms.find(room => room.id === id)
    );
  });
});
