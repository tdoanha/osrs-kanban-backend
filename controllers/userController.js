// controllers/postController.js

const User = require('../models/userModel');

const userController = {
  // Controller method to create a new post
  createUser: async (req, res) => {
    try {
      const { first_name, last_name, password, email, stats, username } = req.body;
      const newPost = await User.create(first_name, last_name, password, email, stats, username);
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Create User: Internal server error' });
    }
  },

  // Controller method to get all posts
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'getAllUsers: Internal server error' });
    }
  },

  // Controller method to get a post by ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      res.status(500).json({ message: 'getUserById: Internal server error' });
    }
  },

  // Controller method to update a post
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, password, email, stats, username } = req.body;
      const updatedUser = await User.update(id, first_name, last_name, password, email, stats, username);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'updateUser: Internal server error' });
    }
  },

  // Controller method to delete a post
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.delete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(204).end(); // 204 No Content
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'deleteUser: Internal server error' });
    }
  }
};

module.exports = userController;
