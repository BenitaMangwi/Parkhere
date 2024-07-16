const express = require("express");
const bookingModel = require("../models/bookingModel");

const router = express.Router();

// Reading bookings for a specific user
router.get("/", async (req, res, next) => {
  try {
    const bookings = await bookingModel.getBookings(req.cookies.user);
    res.render("bookings", { title: "Booking List", bookings });
  } catch (err) {
    next(err);
  }
});



module.exports = router;