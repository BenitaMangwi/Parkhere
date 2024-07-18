const db = require("../services/db");

// Function to get all users
const getUsers = async () => {
    try {
      const rows = await db.query('SELECT * FROM Users');
      return rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  module.exports = {
    getUsers
  };