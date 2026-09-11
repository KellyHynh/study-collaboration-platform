const userService = require("../services/userService");

// Get all users.
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();

        res.json(users);
    } catch (error) {
        next(error);
    }
};

// Get a single user.
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Create a user.
const createUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            passwordHash,
            avatarUrl,
            bio,
            country,
            timezone,
            language,
        } = req.body;

        // Name is required.
        if (!name) {
            return res.status(400).json({
                message: "name is required",
            });
        }

        const user = await userService.createUser({
            name,
            email,
            phone,
            passwordHash,
            avatarUrl,
            bio,
            country,
            timezone,
            language,
        });

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// Update a user.
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.updateUser(
            id,
            req.body
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Delete a user.
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await userService.deleteUser(id);

        if (!deleted) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};