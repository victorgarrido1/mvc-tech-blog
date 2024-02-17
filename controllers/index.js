const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
//and now we set up routes
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
//export module
module.exports = router;