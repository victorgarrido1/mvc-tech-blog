//api index that is responsible of connecting
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoute');




//setting up routes
router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/comments", commentRoutes);

//export routes
module.exports = router;