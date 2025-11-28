const express = require("express");
const router = express.Router();

const { setZone, getZone } = require("../controllers/zoneController");

router.post("/", setZone);   // Save geofence
router.get("/", getZone);    // Retrieve geofence

module.exports = router;
