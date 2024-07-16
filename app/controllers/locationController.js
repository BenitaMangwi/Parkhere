const express = require("express");
const locationModel = require("../models/locationModel");

const router = express.Router();

// Reading locations
router.get("/", async (req, res, next) => {
  try {
    const locations = await locationModel.getLocations();
    res.render("locations", { title: "Location List", locations });
  } catch (err) {
    next(err);
  }
});


module.exports = router;