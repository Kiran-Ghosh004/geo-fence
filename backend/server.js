const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const zoneRoutes = require("./routes/zoneRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();

// FIX FOR CORS
app.use(cors({
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());

connectDB();

app.use("/api/zone", zoneRoutes);
app.use("/api/location", locationRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
