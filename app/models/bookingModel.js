const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

const getBookings = async (userId) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Bookings WHERE user_id = ?", [userId]);
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

const cancelBooking = async (bookingId) => {
  try {
    await connection.query("DELETE FROM Bookings WHERE booking_id = ?", [bookingId]);
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

module.exports = {
  getBookings,
  createBooking,
  cancelBooking,
  connection, // Expose the connection object
};