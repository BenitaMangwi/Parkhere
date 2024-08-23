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

const createLocation = async (location) => {
  try {
    const result = await db.query(
      "INSERT INTO Locations (name) VALUES (?)",
      [location]
    );
    return result;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

// ... other location-related model functions

module.exports = {
  getLocations,
  createLocation,
  // ... other location-related model exports
};