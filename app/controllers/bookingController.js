const express = require('express');
const bookingModel = require('../models/bookingModel');

const router = express.Router();

// Reading bookings for a specific user
router.get("/", async (req, res, next) => {
  try {
    const bookings = await bookingModel.getBookings();
    res.render("bookings", { title: "Booking List", bookings });
  } catch (err) {
    next(err);
  }
});

// Creating a new booking
router.post("/", async (req, res, next) => {
  try {
    await bookingModel.createBooking(req.body);
    res.redirect("/bookings");
  } catch (err) {
    next(err);
  }
});

// Canceling a booking
router.delete("/:bookingId", async (req, res, next) => {
  try {
    await bookingModel.cancelBooking(req.params.bookingId);
    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;