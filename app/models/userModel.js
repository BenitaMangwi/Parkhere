const { query } = require('express');
const db = require('../services/db');
const { pool } = require("../services/db")

// Function to get all users
class User {
  constructor(first_name = null, last_name = null, password = null, email = null, phone_number = null) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.email = email;
    this.phone_number = phone_number;
  }

  async getUserById(id) {
    const sql = `SELECT * FROM User WHERE user_id = ?`;
    const [user] = await db.pool.query(sql, [id]);
    if (user) {
      for (const [key, value] of Object.entries(user[0])) {
        this[key] = value;
      }
    }
  }

  async getUserByEmail(email) {
    const sql = `SELECT * FROM User WHERE email = ?`;
    const [user] = await db.pool.query(sql, [email]);
    if (user) {
      for (const [key, value] of Object.entries(user[0])) {
        this[key] = value;
      }
    }
  }
    print() {
    console.log(this.email);
    console.log(this.first_name, this.last_name);
    }

  static async getUsers() {
    try {
      const rows = await db.query('SELECT * FROM Users');
      return rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

    static async getUser(email, first_name = null) {
      if (first_name) {
        const sql = `SELECT * FROM Users WHERE email = ? or first_name = ?`;
        const [result] = await db.pool.query(sql, [email, first_name]);
        return result;
      } else {
        const sql = `SELECT * FROM Users WHERE email = ?`;
        const [result] = await db.pool.query(sql, [email]);
        return result;
      }
  }

  static async addUser(data) {
    const sql = `INSERT INTO User(first_name, last_name, email, password, phone_number) VALUES(?)`;
    const user = [];

    for (const [key, value] of Object.entries(data)) {
      user.push(value);
    }

    const result = await db.pool.query(sql, [user]);
    return result;
  }
}

const getUsers = async () => {
  try {
    const rows = await db.query('SELECT * FROM Users');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

async function getUser(email, username = null){
  if(username != null) {
    let sql = `SELECT * FROM User WHERE Email = ? or Username = ?`
    let [result] = await db.pool.query(sql, [email, username])
    return result
  }

  let sql = `SELECT * FROM User WHERE Email = ?`
  let [result] = await db.pool.query(sql, [email])
  return result
}  

async function addUser(data){
  let sql = `INSERT INTO User(FirstName, LastName, DateOfBirth, Username, Email, Password) VALUES(?)`
  let user = []

  for([keys, values] of Object.entries(data))
    user.push(values)
  
  let result = await db.pool.query(sql, [user])
  return result
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  User,
};