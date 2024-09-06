const db = require("../services/db");

const getLocations = async () => {
  try {
    const rows = await db.query("SELECT * FROM Locations");
    return rows;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

const createLocation = async (start_date, end_date, start_time, end_time, total_price) => {
  try {
    const result = await db.query(
      "INSERT INTO Locations (start_date, end_date, start_time, end_time, total_price) VALUES (?,?,?,?,?)",
      [start_date, end_date, start_time, end_time, total_price])
    return result.insertId
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};



module.exports = {
  getLocations,
  createLocation,
  // ... other location-related model exports
};