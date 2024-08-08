const db = require("../services/db");


const getBookings = async () => {
    try {
      const rows = await db.query("SELECT * FROM Bookings");
      return rows;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  };

const createBooking = async (bookingData) => {
  try {
    await connection.query("INSERT INTO Bookings SET ?", bookingData);
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

const cancelBooking = async (booking_id) => {
  try {
    await connection.query("DELETE FROM Bookings WHERE booking_id = ?", [booking_id]); // Use booking_id parameter
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

module.exports = {
  getBookings,
  createBooking,
  cancelBooking, // Expose the connection object
};