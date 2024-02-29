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
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comments,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render("post", { post, logged_in: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render dashboard page with all posts by current user
// Find all posts by current user with associated usernames
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    console.log(req.session)
    // Convert post data to plain JavaScript object
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/signup", (req, res) => {
  // Check if the user is already logged in
  if (req.session.logged_in) {
    // If user is already logged in, redirect to some other page
    res.redirect("/dashboard"); // Example: redirecting to dashboard if logged in
  } else {
    // If user is not logged in, render the signup page
    res.render("signup"); // Assuming "signup" is the name of your signup view/template
  }
});

router.get("/login", (req, res) => {
  // req.session.logged_in = false// for testing ;
  if (req.session.logged_in) {
    res.redirect("/signup");
    return;
  }

  res.render("login");
});

// router.get("/dashboard", (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/signup");
//     return;
//   }
//   res.render("signup");
//   console.log(req.session.logged_in);
// });

// render a new post page
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost", {
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.redirect("/login");
});


// render an edit post page
router.get("/editpost/:id", async (req, res) => {
  try {
    const postData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comments,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("editpost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//to be able to get them to sign up?
router.get("/login", (req, res) => {
  if (req.session.session_logged_in) {
    res.render("signup");
  }
});

module.exports = router;
