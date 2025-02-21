const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reviewedLogs: [
    {
      logId: { type: mongoose.Schema.Types.ObjectId, ref: "WasteLog" },
      action: { type: String, enum: ["approved", "rejected"] },
      reviewedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);
