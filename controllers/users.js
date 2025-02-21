const User = require("../models/user");
const Waste = require("../models/waste");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



module.exports.rendersignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    // automatically logged in when user signUp
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to EcoQuest!");
      res.redirect("/EcoQuest");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to EcoQuest!");
  let redirectUrl = res.locals.redirectUrl || "/EcoQuest";
  res.redirect(redirectUrl);
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

module.exports.renderLogForm = (req, res) => {
  res.render("users/logsForm.ejs");
};

module.exports.wasteLog = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);

    if (!req.user) {
      req.flash("error", "You must be logged in to submit a waste log.");
      return res.redirect("/EcoQuest/login");
    }

    const { weight, description } = req.body;
    if (!weight || !description || !req.file) {
      req.flash("error", "All fields are required!");
      return res.redirect("/EcoQuest/wasteLog");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    // Save waste log
    const newWasteLog = new Waste({
      userId: req.user._id,
      quantity: weight,
      image: { url, filename },
      createdAt: new Date(),
    });

    await newWasteLog.save();
    req.flash("success", "New waste log created!");

    // Fetch latest showLogs (latest 5 entries)
    const showLogs = await Waste.find({})
      .populate("userId", "username") // Fetch user details
      .sort({ createdAt: -1 }) // Sort by latest entries
      .limit(5);

    res.render("listing/showLogs", { showLogs });
  } catch (err) {
    console.error("Error saving waste log:", err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/EcoQuest/wasteLog");
  }
};


