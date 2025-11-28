let activeZone = null;  // stored in memory

exports.setZone = (req, res) => {
  const { center, radius } = req.body;

  if (!center || typeof center.lat !== "number" || typeof center.lng !== "number") {
    return res.status(400).json({ error: "center must contain lat and lng" });
  }

  if (!radius || typeof radius !== "number" || radius <= 0) {
    return res.status(400).json({ error: "radius must be a positive number" });
  }

  activeZone = { center, radius };

  res.json({
    message: "Zone saved successfully",
    zone: activeZone
  });
};

exports.getZone = (req, res) => {
  res.json({ zone: activeZone });
};

// Helper function for other controllers
exports._getActiveZone = () => activeZone;
