const router = require("express").Router();
const { Blog, User, Comments } = require("../../models");
const withAuth = require("../../utils/auth");
const { route } = require("./userRoutes");

//this is to get all of the x
router.get("/", async (req, res) => {
  try {
    const postData = await User.Blog.findAll({
      include: [{ module: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get one post by ID with associated username/comment
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    console.log("success");
    const newPost = await Blog.create({
      user_id: req.session.user_id,
      ...req.body,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Blog.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete all comments related to the post
    await Comments.destroy({
      where: { post_id: req.params.id },
    });

    const deletedPost = await Blog.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one post by the ID association with username and comments

//exports the router
module.exports = router;
