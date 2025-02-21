const Admin = require("../models/admin");

module.exports.renderAdminForm = (req, res) => {
  res.render("users/adminLogin.ejs");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/EcoQuest");
  });
};
