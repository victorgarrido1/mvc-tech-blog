const { Comments } = require("../models");

const commentData = [
  {
    comment_text: "This is a great article ✨!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "I will share my upvote for this article",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "This is not my favorite but they made a effort",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text:
      "While they shared good feedback, I disagree with the comment.",
    user_id: 4,
    post_id: 1,
  },
  {
    comment_text: "The article changed the way I think.",
    user_id: 5,
    post_id: 1,
  },
];

const seedAllComments = () => Comments.bulkCreate(commentData);

module.exports = seedAllComments();