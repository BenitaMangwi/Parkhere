const db = require("../services/db");
const bcrypt = require("bcryptjs");

// Function to get all users
class User {
  constructor(first_name=null, last_name=null, password=null, email=null, phone_number=null) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.email = email;
    this.phone_number = phone_number;
  }

  async getIdFromEmail() {
    const sql = "SELECT user_id FROM Users WHERE Users.email = ?";
    const result = await db.query(sql, [this.email]);
    // TODO LOTS OF ERROR CHECKS HERE..
    if (JSON.stringify(result) != '[]') {
      this.user_id = result[0].user_id;
      return this.user_id;
    } else {
      return false;
    }
  }
  // Add a password to an existing user
  async setUserPassword(password) {
    const pw = await bcrypt.hash(password, 10);
    var sql = "UPDATE Users SET password = ? WHERE Users.id = ?"
    const result = await db.query(sql, [pw, this.id]);
    return true;
}

  // Add a new record to the users table    
  async addUser(password) {
    const pw = await bcrypt.hash(password, 10);
    var sql = "INSERT INTO Users (email, password , first_name, last_name, phone_number) VALUES (? , ? , ? , ? , ?)";
    const result = await db.query(sql, [this.email, pw]);
    console.log(result.insertId);
    this.user_id = result.insertId;
    return true;
}

  // Test a submitted password against a stored password
  async authenticate(submitted) {
    // Get the stored, hashed password for the user
    var sql = "SELECT password FROM Users WHERE user_id = ?";
    const result = await db.query(sql, [this.user_id]);
    const match = await bcrypt.compare(submitted, result[0].password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
  }
}

  module.exports = {
    User
  };