const express = require('express');
const locationModel = require('../models/locationModel');

const router = express.Router();

// Get all locations
router.get("/", async (req, res) => {
  try {
    const locations = await locationModel.getLocations();
    res.render("locations", { title: "Locations List", locations });
  } catch (err) {
    next(err);
  }
});

// Create a new location
router.post("/", async (req, res) => {
  try {
    await locationModel.createLocation(req.body);
    res.redirect("/locations");
  } catch (err) {
    next(err);
  }
});

// ... other location-related routes

module.exports = router;