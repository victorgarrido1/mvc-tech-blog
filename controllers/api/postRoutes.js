const router = require('express').Router();
const { Blog, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//this is to get all of the x 
router.get('/', async (req, res) => {
    try {
        const postData = await User.Blog.findAll({
            include: [{ module: User, attributes: ["username"]}],
        });
        res.status(200).json(postData);    
    } catch (err) {
        res.status(500).json(err);
    }
});

//get one post by the ID association with username and comments

//exports the router
module.exports = router;