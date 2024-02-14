const seedPosts = require("./postsData");
const seedUsers = require("./userData");
const seedComments = require("./commentsData");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----Database Synced----");

  await seedPosts();
  console.log("\n----Posts Seeded----");

  await seedUsers();
  console.log("\n----Users Seeded----");

  await seedComments();
  console.log("\n----Comments Seeded----");

  process.exit(0);
};

seedAll();
