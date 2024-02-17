const router = require('express').Router();
const { User, Blog, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        // Retrieve all blog posts along with the associated usernames
        const postData = await Blog.findAll({
            include: [{ model: User, attributes: ["username"] }]
        });

        // Send the data as a response
        res.json(postData);
    } catch (err) {
        // Handle error that may occur
        console.error("Error fetching the blog posts:", err);
        res.status(500).json({ error: "Failed to retrieve blog posts" });
    }

    const post = postData.map((post) => post.get({ plain: true
    }));
});

module.exports = router;
