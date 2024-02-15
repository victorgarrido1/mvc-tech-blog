//Middleware function to check user is logged in
const withAuth = (req, res, next) => {
    //if the user is not logged in send  them back to the login page
    if (!req.session.loggedIn) {
        res.redirect("/login");
    } else {
        //if the user is logged in
        next();
    }
};

module.exports = withAuth;