const users = require("../mock/users");
const rooms = require("../mock/rooms");
const bets = require("../mock/bets");
const events = require("../events");

const Base = require("./Base");

class Server extends Base {
  roulette = null;
  user = null;
  room = null;

  constructor(params) {
    super(params.io);

    this.room = params.room;
    this.user = params.user;
    this.roulette = params.roulette;
  }

  connection() {
    this.io.on("connection", socket => {
      const user = this.user.createUser(socket);

      this.room.addUserToRoom(user);

      this.io.emit(events.GET_ROOMS_LIST, rooms);
      this.io.emit(events.GET_MAIN_DATA, this.getMainData());

      socket.emit(events.GET_ROULETTE_OPTIONS, this.roulette.options);
      socket.emit(events.GET_BETS_LIST, bets);

      socket.on(events.ADD_MESSAGE, data => this.room.addMessage(data));
      socket.on(events.CHANGE_ROOM, data => this.room.changeRoom(data, socket));
      socket.on(events.ADD_BET, data => this.addBet(data, socket));
    });
  }

  addBet(data, socket) {
    if (!data.value) {
      return;
    }

    this.addOrUpdateBetValue(data);
    this.user.updateUserBalance(data, socket);
  }

  addOrUpdateBetValue(data) {
    const index = bets.findIndex(bet => bet.id === data.id);
    const userBetIndex = bets[index].items.findIndex(
      ({ userId }) => userId === data.userId
    );

    if (userBetIndex === -1) {
      bets[index].items.push(data);
    } else {
      bets[index].items[userBetIndex].value += data.value;
    }

    this.io.emit(events.GET_BETS_LIST, bets);
  }

  getMainData() {
    return {
      users,
      usersOnline: users.length,
      lang: "en"
    };
  }
}

module.exports = Server;
