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

  try{ 
    let{ start_date, end_date, start_time, end_time } = req.body

    bookingModel.createBooking (start_date, end_date, start_time, end_time)
    res.redirect("/bookings");
  
  }catch (err) {
  next(err)
 }

});



// Canceling a booking

router.get("/:booking_id/delete", async (req, res, next) => {
  try {
    const booking = await bookingModel.getSinglebooking(req.params.booking_id);

    res.render("delete_booking", { title: "Cancel Booking:", booking });
  } catch (err) {
    next(err);
  }
});

router.post('/:booking_id/delete', async (req, res) => {
  await bookingModel.cancelBooking(req.params.booking_id)
  res.redirect('/bookings')
});


module.exports = router;