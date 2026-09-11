const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// Get all categories.
router.get("/", categoryController.getAllCategories);

// Create a category.
router.post("/", categoryController.createCategory);

// Get a single category.
router.get("/:id", categoryController.getCategory);

// Update a category.
router.patch("/:id", categoryController.updateCategory);

// Delete a category.
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;