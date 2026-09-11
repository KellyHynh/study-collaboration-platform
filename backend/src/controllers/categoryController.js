const categoryService = require("../services/categoryService");

// Get all categories.
const getAllCategories = async (req, res, next) => {
    try {
        const categories =
            await categoryService.getAllCategories();

        res.json(categories);
    } catch (error) {
        next(error);
    }
};

// Get a single category.
const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category =
            await categoryService.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
};

// Create a category.
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Category name is required.
        if (!name) {
            return res.status(400).json({
                message: "name is required",
            });
        }

        const category =
            await categoryService.createCategory(name);

        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

// Update a category.
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Category name is required for this update.
        if (!name) {
            return res.status(400).json({
                message: "name is required",
            });
        }

        const category =
            await categoryService.updateCategory(id, name);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
};

// Delete a category.
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted =
            await categoryService.deleteCategory(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};