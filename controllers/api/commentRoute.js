const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
    try {
        //create a new comment with the provided data
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.body.user_id,
        });
        // sends a 200 error response
        res.status(200).json(newComment);
    } catch (err) {
        //this will handle error
        res.status(500).json(err);
    };
});
//final export the model
module.exports = router;