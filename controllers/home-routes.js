const router = require('express').Router();
const { User, Blog, Comments } = require('../models');
const withAuth = require('../utils/auth');
const { post } = require('./home-routes');

//this is the home page route!
router.get("/", async (req, res) => {
    try {
        // Retrieve all blog posts along with the associated usernames
        const postData = await Blog.findAll({
            include: [{ model: User, attributes: ["username"] }]
        });

        const blogs = postData.map(blog => blog.get({ plain: true }))

        // Send the data as a response
        res.render("homepage", {
            blogs, logged_in: req.session.logged_in
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
            include: [{ model: User, attributes:  ["username"] }],
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
  })

module.exports = router;
