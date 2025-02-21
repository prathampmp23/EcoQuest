const recyclingCenterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    contact: { type: String },
    acceptedMaterials: [{ type: String }]
  });
  
  module.exports = mongoose.model("RecyclingCenter", recyclingCenterSchema);
  
