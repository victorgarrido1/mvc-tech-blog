const router = require("express").Router();
const { Blog, User, Comments } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//this route post is for the login in page is located
router.post("/login", async (req, res) => {
  try {
    const newUser = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(req.body);
    console.log(req.body.username, req.body.password);

    if (!newUser) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = newUser.checkPassword(req.body.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }
    console.log(validPassword);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: newUser, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(newUser);
  }
});

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }

});

//for testing 
router.get("/seeall", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

//exports the router
module.exports = router;
