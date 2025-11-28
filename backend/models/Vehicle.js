const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  lastLat: Number,
  lastLng: Number,
  currentZone: { type: String, default: "outside" },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
