// controllers/taskController.js

const Task = require("../models/taskModel");

const taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const { title, task_description, project, assigned_to, created_by } =
        req.body;
      const created_on = new Date();
      const newTask = await Task.createTask(
        title,
        task_description,
        project,
        assigned_to,
        created_on,
        created_by,
      );
      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error creating Task:", error);
      res.status(500).json({ message: "Create Task: Internal server error" });
    }
  },

  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error getting tasks:", error);
      res.status(500).json({ message: "getAllTasks: Internal server error" });
    }
  },

  // Get a task by ID
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.getTaskById(id);
      res.status(200).json(task);
    } catch (error) {
      console.error("Error getting task by ID:", error);
      res.status(500).json({ message: "getTaskById: Internal server error" });
    }
  },

  // Update a task
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        task_description,
        project,
        assigned_to,
        created_by,
        completed_on,
        completed_by,
      } = req.body;
      const updatedTask = await Task.updateTask(
        id,
        title,
        task_description,
        project,
        assigned_to,
        created_by,
        completed_on,
        completed_by,
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "updateTask: Internal server error" });
    }
  },

  // Delete a task
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(204).end(); // 204 No Content
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "deleteTask: Internal server error" });
    }
  },
};

module.exports = taskController;
