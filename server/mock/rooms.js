const users = require("./users");

module.exports = [
  {
    id: 1,
    name: "Russian room",
    icon: "ru",
    users: [users[0], users[1], users[2], users[3]],
    messagesList: [
      { userId: 1, message: `${users[0].name} message` },
      { userId: 2, message: `${users[1].name} message` },
      { userId: 3, message: `${users[2].name} message` },
      { userId: 4, message: `${users[3].name} message` }
    ]
  },
  {
    id: 2,
    name: "USA room",
    icon: "usa",
    users: [users[4], users[5], users[6]],
    messagesList: [
      { userId: 5, message: `${users[4].name} message` },
      { userId: 6, message: `${users[5].name} message` },
      { userId: 7, message: `${users[6].name} message` }
    ]
  },
  {
    id: 3,
    name: "German room",
    icon: "de",
    users: [users[7], users[8], users[9], users[10]],
    messagesList: [
      { userId: 8, message: `${users[7].name} message` },
      { userId: 9, message: `${users[8].name} message` },
      { userId: 10, message: `${users[9].name} message` },
      { userId: 11, message: `${users[10].name} message` }
    ]
  }
];
