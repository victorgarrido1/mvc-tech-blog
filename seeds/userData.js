const { Model } = require("sequelize");
const { User } = require("../models");

const userData = [
  {
    username: "steve_wonder",
    twitter: "swonder",
    github: "swonder",
    email: "swonder@mail.com",
    password: "wonderful",
  },
  {
    username: "hannah_hall",
    twitter: "hannahhall",
    github: "hannahhall",
    email: "hmall@mail.com",
    password: "homehomehome",
  },
  {
    username: "sammy_luke",
    twitter: "sluke",
    github: "sluke1",
    email: "sluke@mail.com",
    password: "blueberrybot",
  },
  {
    username: "byleth_pike",
    twitter: "bylethrules",
    github: "bylethrules",
    email: "b@mail.com",
    password: "swordsdance",
  },
  {
    username: "john_rogers",
    twitter: "johnr",
    github: "johnr",
    email: "johnr@mail.com",
    password: "orangestreet",
  },
  {
    username: "yes_valerie",
    twitter: "valerie",
    github: "valerie",
    email: "v@mail.com",
    password: "sunglasses",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;