const db = require("../services/db");


const getBookings = async () => {
    try {
      const rows = await db.query(
        `SELECT b.*, l.name AS booking_name, l.address AS booking_address
        FROM Bookings b
        JOIN Locations l ON b.parking_space_id = l.parking_space_id`
      );
      return rows;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  };

  //Create booking
const createBooking = async (user_id, parking_space_id, start_date, end_date, start_time, end_time, total_price)=> {
  try {
    const result = await db.query(
      "INSERT INTO Bookings (user_id, parking_space_id, start_date, end_date, start_time, end_time, total_price) VALUES (?,?,?,?,?,?)",
      [user_id, parking_space_id, start_date, end_date, start_time, end_time, total_price])

    return result.insertId

  } catch (error) {
      console.error("Error creating location:", error);
      throw error;
  }
};

//get single booking

async function getSinglebooking(bookingId) {
  try {
    const sql = `SELECT * FROM Bookings WHERE booking_id = ?`;
    const [booking] = await db.query(sql, [bookingId]);

    if (!booking) {
      throw new Error(`Booking with ID ${bookingId} not found`);
    }

    return booking;
  } catch (error) {
    throw error; // Re-throw the error for handling in the controller
  }
}
//Delete booking


async function cancelBooking(booking_id) {
  try {
    await db.query('DELETE FROM Bookings WHERE booking_id = ?', [booking_id]);
  } catch (error) {
    throw error; // Re-throw the error for handling in the controller
  }
}


module.exports = {
  getBookings,
  createBooking,
  cancelBooking,
  getSinglebooking, // Expose the connection object
};