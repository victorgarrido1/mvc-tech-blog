const router = require('express').Router();
const { User, Blog, Comments } = require('../models');
const withAuth = require('../utils/auth');

//this is the home page
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

module.exports = router;
