const seedUsers = require("./userData");
const seedPosts = require("./postsData");
const seedAllComments = require("./commentsData");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----Database Synced----");

  await seedUsers();
  console.log("\n----Users Seeded----");

  await seedPosts();
  console.log("\n----Posts Seeded----");

  await seedAllComments();
  console.log("\n----Comments Seeded----");

  process.exit(0);
};

seedAll();
