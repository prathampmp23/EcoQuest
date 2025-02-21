const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  pointsRequired: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reward", rewardSchema);
