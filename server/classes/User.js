const users = require("../mock/users");
const events = require("../events");

const Base = require("./Base");

module.exports = class User extends Base {
  usersSockets = {};

  constructor(io) {
    super(io);
  }

  createUser(socket) {
    const num = users.length + 1;
    const user = {
      id: num,
      name: `New User ${num}`,
      level: num,
      avatar: "",
      balance: 10000
    };

    this.usersSockets[num] = socket;

    users.push(user);

    socket.emit(events.GET_USER, user);

    return user;
  }

  updateUserBalance(data) {
    const user = users.find(({ id }) => id === data.userId);
    user.balance -= data.value;

    this.usersSockets[user.id].emit(events.UPDATE_USER_BALANCE, user.balance);
  }

  updateUsersListBalance(usersForUpdate) {
    usersForUpdate.forEach(({ userId, value }) => {
      const user = users.find(({ id }) => id === userId);

      user.balance += value;
      this.usersSockets[userId].emit(events.UPDATE_USER_BALANCE, user.balance);
    });
  }
};
