const mongoose = require("mongoose");
const wasteLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: {
    url: String,
    filename: String,
  }, // Cloud storage URL
  quantity: { type: Number, required: true }, // Amount in kg
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who reported it
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WasteLog", wasteLogSchema);
