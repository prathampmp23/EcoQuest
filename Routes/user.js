const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Admin = require("../models/admin");
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const userController = require("../controllers/users.js");
const adminController = require("../controllers/admin.js");

router
  .route("/EcoQuest/wasteLog")
  .get(userController.renderLogForm)
  .post(upload.single("image"), wrapAsync(userController.wasteLog));

router
  .route("/EcoQuest/signup")
  .get(userController.rendersignUpForm)
  .post(upload.single("image"), wrapAsync(userController.signUp));

router.route("/EcoQuest/admin").get(adminController.renderAdminForm);

router.get("/EcoQuest/leaderboard", userController.renderLeaderboard);

router
  .route("/EcoQuest/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/EcoQuest/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
