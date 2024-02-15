const { Blog } = require("../models");
const postData = [
  {
    title: "The Next Evolution in tech is VR",
    post_content:
      "With Many innovations in the virtual reality world. Many large scale companies are making their way to VR.",
    user_id: 3,
  },
  {
    title: "Milk Music Offers A New Add-On",
    post_content:
      "The ever so-popular music streaming service for web developers just added a new feature at no cost!",
    user_id: 1,
  },
  {
    title: "Tech Talk With Tech Timmy",
    post_content:
      "After a long wait, Tech Tim recently shared his new thoughts about AI and what I can bring to the table",
    user_id: 2,
  },
  {
    title: "New Password Manager Tool Available",
    post_content:
      "EasyOne is a simple password manager that makes it easy for you to store your password in a easy and safe way.",
    user_id: 2,
  },
  {
    title: "SVG Gallery",
    post_content:
      "Looking for a SVG gallery. SVG Creations will be hosting a demo of their SVG online early next month , ",
    user_id: 5,
  },
];

const seedPosts = () => Blog.bulkCreate(postData);

module.exports = seedPosts;
