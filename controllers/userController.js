// controllers/userController.js

const User = require("../models/userModel");

const userController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      const { first_name, last_name, password, email, stats, username } =
        req.body;
      const newUser = await User.createUser(
        first_name,
        last_name,
        password,
        email,
        stats,
        username,
      );
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Create User: Internal server error" });
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: "getAllUsers: Internal server error" });
    }
  },

  // Get a user by ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ message: "getUserById: Internal server error" });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, password, email, stats, username } =
        req.body;
      const updatedUser = await User.updateUser(
        id,
        first_name,
        last_name,
        password,
        email,
        stats,
        username,
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "updateUser: Internal server error" });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).end(); // 204 No Content
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "deleteUser: Internal server error" });
    }
  },
};

module.exports = userController;
