const rooms = require("../mock/rooms");
const events = require("../events");
const users = require("../mock/users");

const Base = require("./Base");

module.exports = class Room extends Base {
  constructor(io) {
    super(io);
  }

  changeRoom({ newRoomId, oldRoomId, userId }, socket) {
    const oldRoom = rooms.find(room => room.id === oldRoomId);
    const newRoom = rooms.find(room => room.id === newRoomId);

    const user = users.find(user => user.id === userId);

    oldRoom.users = oldRoom.users.filter(user => user.id !== userId);
    newRoom.users.push(user);

    socket.emit(events.GET_ROOM, newRoom);

    this.io.emit(events.GET_ROOMS_LIST, rooms);
  }

  addUserToRoom(user, roomId = 1) {
    const room = this.getRoomById(roomId);

    room.users.push(user);

    this.io.emit(events.GET_ROOM, room);
  }

  addMessage({ roomId, data }) {
    const room = this.getRoomById(roomId);

    room.messagesList.push(data);

    this.io.emit(events.GET_ROOM, room);
  }

  getRoomById(id) {
    return rooms.find(room => id === room.id);
  }
};
