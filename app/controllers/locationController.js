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
router.get("/create", async (req, res, next) => {
  res.render("register", { title: "Create a location" });
});

router.post("/create", async (req, res, next) => {
  console.log(req.body);
  await locationModel.createLocation(req.body.name);
  res.redirect("/locations");
});



module.exports = router;