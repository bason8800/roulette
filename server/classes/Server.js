const users = require("../mock/users");
const rooms = require("../mock/rooms");
const mainData = require("../mock/mainData");

class Server {
  io = null;
  roulette = null;

  constructor(io, roulette) {
    this.io = io;
    this.roulette = roulette;
  }

  connection() {
    this.io.on("connection", socket => {
      this.sendUserData(socket);

      this.io.emit("GET_ROOMS_LIST", rooms);
      this.io.emit("GET_MAIN_DATA", this.getMainData());

      socket.emit("GET_ROULETTE_OPTIONS", this.roulette.options);

      socket.on("ADD_MESSAGE", data => this.addMessage(data));
      socket.on("CHANGE_ROOM", data => this.changeRoom(data, socket));
    });
  }

  sendUserData(socket, roomId = 1) {
    const room = this.getRoomById(roomId);
    const user = this.createUser();

    users.push(user);

    room.users.push(user);

    socket.emit("GET_USER", { ...user, balance: 10000 });

    this.io.emit("GET_ROOM", room);
  }

  changeRoom({ newRoomId, oldRoomId, userId }, socket) {
    const oldRoom = rooms.find(room => room.id === oldRoomId);
    const newRoom = rooms.find(room => room.id === newRoomId);

    const user = users.find(user => user.id === userId);

    oldRoom.users = oldRoom.users.filter(user => user.id !== userId);
    newRoom.users.push(user);

    socket.emit("GET_ROOM", newRoom);

    this.io.emit("GET_ROOMS_LIST", rooms);
  }

  addMessage({ roomId, data }) {
    const room = this.getRoomById(roomId);

    room.messagesList.push(data);

    this.io.emit("GET_ROOM", room);
  }

  createUser() {
    const num = users.length + 1;

    return { id: num, name: `New User ${num}`, level: num, avatar: "" };
  }

  getRoomById(id) {
    return rooms.find(room => id === room.id);
  }

  getMainData() {
    return {
      lang: "en",
      usersOnline: users.length
    };
  }
}

module.exports = Server;
