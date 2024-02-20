const router = require("express").Router();
const { User, Blog, Comments } = require("../models");
const withAuth = require("../utils/auth");

//this is the home page route!
router.get("/", async (req, res) => {
  try {
    // Retrieve all blog posts along with the associated usernames
    const postData = await Blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const blogs = postData.map((blog) => blog.get({ plain: true }));

    // Send the data as a response
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Handle error that may occur
    console.error("Error fetching the blog posts:", err);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Find post by ID with associated username and comments with associated usernames
    const postData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });
    // Render post template with post data and login status
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return 500 status code and error message
    res.status(500).json(err);
  }
});

//Route to render dashboard page with all posts by current user
//Find all the posts by current user with their username
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    //convert post data to JavaScript object
    const posts = postData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//using the withAuth middleware to prevent access to the route from the user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((blog) => blog.get({ plain: true }));
    // Pass the posts array to the dashboard view, not 'blog'
    res.render("dashboard", {
      posts, // Corrected from 'blog' to 'posts'
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // req.session.logged_in = false// for testing ;
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});


router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
    
  }
  res.render("signup");
  console.log(req.session.logged_in);
});



















// render a new post page
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost");
    return;
  }
  res.redirect("/login");
});

//route to for the edit post page
// Route to render the edit post page
router.get("/editpost/:id", async (req, res) => {
  try {
    // Find the blog post by its primary key (id)
    const postData = await Blog.findByPk(req.params.id, {
      // Include associated data: user who authored the post and comments on the post
      include: [
        { model: User, attributes: ["username"] }, // Include user data with username attribute
        {
          model: Comments, // Include associated comments
          include: [{ model: User, attributes: ["username"] }], // Include user data for each comment
        },
      ],
    });

    const post = postData.get({ plain: true });

    // Render the edit post page and pass retrieved data to the template
    //possible needs to be changed
    res.render("editpost", { postData });
  } catch (err) {
    // Handle errors
    console.error("Error fetching blog post data:", err);
    res.status(500).json({ err: "Failed to retrieve blog post data" });
  }
});

module.exports = router;
