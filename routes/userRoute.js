// routes/postRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;