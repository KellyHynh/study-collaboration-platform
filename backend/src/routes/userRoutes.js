const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Get all users.
router.get("/", userController.getAllUsers);

// Create a user.
router.post("/", userController.createUser);

// Get a single user.
router.get("/:id", userController.getUser);

// Update a user.
router.patch("/:id", userController.updateUser);

// Delete a user.
router.delete("/:id", userController.deleteUser);

module.exports = router;