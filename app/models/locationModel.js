const db = require("../services/db");

// Function to fetch available parking spaces
const getLocation = async () => {
  try {
    const rows = await db.query("SELECT * FROM Locations");
    return rows;
  } catch (error) {
    console.error("Error fetching parking spaces:", error);
    throw error;
  }
};


module.exports = {
    getLocation
  };