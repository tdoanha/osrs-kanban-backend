// models/taskModel.js

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

// Define the Tasks model methods
const Task = {
  // Create a new task
  async createTask(
    title,
    task_description,
    project,
    assigned_to,
    created_on,
    created_by,
  ) {
    const query =
      "INSERT INTO tasks (title, task_description, project, assigned_to, created_on, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      title,
      task_description,
      project,
      assigned_to,
      created_on,
      created_by,
    ];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Get all tasks
  async getAllTasks() {
    const query = "SELECT * FROM tasks";
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query);
      return rows;
    } finally {
      client.release();
    }
  },
  // Get a task by ID
  async getTaskById(id) {
    const query = "SELECT * FROM tasks WHERE id = $1";
    const values = [id];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Update a task
  async updateTask(
    id,
    title,
    task_description,
    project,
    assigned_to,
    created_by,
    completed_on,
    completed_by,
  ) {
    const query =
      "UPDATE tasks SET title = $2, task_description = $3, project = $4, assigned_to = $5, created_by = $6, completed_on = $7, completed_by = $8 WHERE id = $1 RETURNING *";
    const values = [
      id,
      title,
      task_description,
      project,
      assigned_to,
      created_by,
      completed_on,
      completed_by,
    ];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Delete a task
  async deleteTask(id) {
    const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";
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

module.exports = Task;
