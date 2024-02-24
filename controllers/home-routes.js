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
      router.get("/post/:id", async (req, res) => {
        try {
          const postData = await Blog.findByPk(req.params.id, {
            include: [
              User,
              {
                model: Comment,
                include: [User],
              },
            ],
          });

          if (postData) {
            const post = postData.get({ plain: true });

            res.render("post", { post, loggedIn: req.session.logged_in });
          } else {
            res.status(404).end();
          }
        } catch (err) {
          res.status(500).json(err);
        }
      });
      res.render("post", { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//We need to create a route for the post//
router.get("/t");

router.get("/login", (req, res) => {
  // req.session.logged_in = false// for testing ;
  if (req.session.logged_in) {
    res.redirect("/signup");
    return;
  }

  res.render("login");
});

router.get("/dashboard", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/signup");
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


//to be able to get them to sign up?
router.get("/login", (req, res) => {
  if (req.session.session_logged_in) {
    res.render("signup");
  }
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
