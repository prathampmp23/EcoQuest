const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  points: { type: Number, default: 0 },
  logsVerified: { type: Number, default: 0 },
  reportsReceived: { type: Number, default: 0 },
  rewardsClaimed: [
    {
      rewardId: { type: mongoose.Schema.Types.ObjectId, ref: "Reward" },
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
