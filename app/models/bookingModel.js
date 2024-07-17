// Function to fetch bookings for a specific user
const getBookings = async (user_id) => {
    try {
      const rows = await db.query("SELECT * FROM Bookings");
      return rows;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  };

  module.exports = {
    getBookings
  };