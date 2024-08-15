const express = require('express');
const bookingModel = require('../models/bookingModel');
const locationModel = require('../models/locationModel');

const router = express.Router();

// Reading bookings for a specific user
router.get("/", async (req, res, next) => {
  try {
    const bookings = await bookingModel.getBookings();
    const locations = await locationModel.getLocations(); // Assuming you have a locationModel
    res.render("bookings", { title: "Booking List", bookings, locations });
  } catch (err) {
    next(err);
  }
});

// Creating a new booking
router.get("/booking", async (req, res, next) => {
  res.render("new_booking", { title: "New Booking" });
});

router.post("/booking", async (req, res, next) => {
  console.log(req.body);
  await bookingModel.createBooking(req.body.booking_id);
  res.redirect("/bookings");
});
// Canceling a booking

router.delete("/:booking_id", async (req, res, next) => {
  try {
    await bookingModel.cancelBooking(req.params.booking_id); // Use req.params.bookingId
    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;