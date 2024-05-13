// models/projectModel.js

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

// Define the Projects model methods
const Project = {
  // Create a new project
  async createProject(title, project_description, created_on, created_by) {
    const query =
      "INSERT INTO projects (title, project_description, created_on, created_by) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [title, project_description, created_on, created_by];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Get all projects
  async getAllProjects() {
    const query = "SELECT * FROM projects";
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query);
      return rows;
    } finally {
      client.release();
    }
  },
  // Get a project by ID
  async getProjectById(id) {
    const query = "SELECT * FROM projects WHERE id = $1";
    const values = [id];
    const client = await pool.connect();
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } finally {
      client.release();
    }
  },
  // Update a project
  async updateProject(
    id,
    title,
    project_description,
    created_by,
    completed_on,
    completed_by,
  ) {
    const query =
      "UPDATE projects SET title = $2, project_description = $3, created_by = $4, completed_on = $5, completed_by = $6 WHERE id = $1 RETURNING *";
    const values = [
      id,
      title,
      project_description,
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
  // Delete a project
  async deleteProject(id) {
    const query = "DELETE FROM projects WHERE id = $1 RETURNING *";
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

module.exports = Project;
