// models/userModel.js

const { Pool } = require("pg");
const env = require("dotenv");

env.config();

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
});

// Define the Users model methods
const User = {
  // Create a new user
  async createUser(first_name, last_name, password, email, stats, username) {
    const query =
      "INSERT INTO users (first_name, last_name, password, email, stats, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [first_name, last_name, password, email, stats, username];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Get all users
  async getAllUsers() {
    const query = "SELECT * FROM users";
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query);
      return rows;
    } finally {
      client.release();
    }
  },
  // Get a user by ID
  async getUserById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [id];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Update a user
  async updateUser(
    userId,
    first_name,
    last_name,
    password,
    email,
    stats,
    username,
  ) {
    const query =
      "UPDATE users SET first_name = $2, last_name = $3, password = $4, email = $5, stats = $6, username = $7 WHERE id = $1 RETURNING *";
    const values = [
      userId,
      first_name,
      last_name,
      password,
      email,
      stats,
      username,
    ];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Delete a user
  async deleteUser(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const values = [id];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
};

module.exports = User;
