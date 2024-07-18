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

const createLocation = async (locationData) => {
  try {
    await db.query("INSERT INTO Locations SET ?", locationData);
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