const users = [
  { name: "Flukester", level: 10, avatar: "" },
  { name: "CSGOMAIN", level: 5, avatar: "" },
  { name: "ChungFam", level: 35, avatar: "" },
  { name: "ConnorRF", level: 50, avatar: "" },
  { name: "hans", level: 2, avatar: "" },
  { name: "Atlanics", level: 20, avatar: "" },
  { name: "VladSoferPeAK", level: 13, avatar: "" },
  { name: "Havalet", level: 25, avatar: "" },
  { name: "Kaneki Ken√A", level: 12, avatar: "" },
  { name: "Mx43", level: 9, avatar: "" },
  { name: "Benny", level: 45, avatar: "" }
];

module.exports = users.map((user, idx) => ({ ...user, id: idx + 1 }));
