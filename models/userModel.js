// models/userModel.js

const { Pool } = require("pg");
const env = require("dotenv");

env.config();

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT
});

// Define the Users model methods
const User = {
  // Method to create a new post
  async create(first_name, last_name, password, email, stats, username) {
    const query = 'INSERT INTO users (first_name, last_name, password, email, stats, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [first_name, last_name, password, email, stats, username]; 
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Method to get all users
  async getAll() {
    const query = 'SELECT * FROM users';
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query);
      return rows;
    } finally {
      client.release();
    }
  },
  // Method to get a user by ID
  async getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Method to update a user
  async update(userId, firstName, lastName, password, email, stats) {
    const query = 'UPDATE posts SET firstName = $2, lastName = $3, password = $4, email = $5, stats = $6 WHERE id = $1 RETURNING *';
    const values = [userId, firstName, lastName, password, email, stats];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Method to delete a post
  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  }
};

module.exports = User;
