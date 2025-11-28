const Vehicle = require("../models/Vehicle");
const { getDistance } = require("../utils/geoChecker");
const { _getActiveZone } = require("./zoneController");

exports.updateLocation = async (req, res) => {
  const { vehicleId, lat, lng } = req.body;

  // Basic checks
  if (!vehicleId || typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ error: "vehicleId, lat, lng required" });
  }

  const zone = _getActiveZone();
  if (!zone) {
    return res.status(400).json({ error: "No active zone set yet" });
  }

  // Find or create vehicle
  let vehicle = await Vehicle.findOne({ vehicleId });
  if (!vehicle) {
    vehicle = await Vehicle.create({
      vehicleId,
      lastLat: lat,
      lastLng: lng,
      currentZone: "outside"
    });
  }

  // Calculate distance from geofence center
  const distance = getDistance(lat, lng, zone.center.lat, zone.center.lng);

  // Determine if inside or outside
  const isInside = distance <= zone.radius;
  const previous = vehicle.currentZone;
  const current = isInside ? "inside" : "outside";

  let event = "no-change";

  if (previous === "outside" && current === "inside") event = "entered";
  if (previous === "inside" && current === "outside") event = "exited";

  // Save updated state
  vehicle.lastLat = lat;
  vehicle.lastLng = lng;
  vehicle.currentZone = current;
  vehicle.lastUpdated = new Date();
  await vehicle.save();

  // Send output to frontend
  res.json({
    vehicleId,
    event,
    lat,
    lng,
    distance,
    zoneStatus: current,
    timestamp: new Date()
  });
};
