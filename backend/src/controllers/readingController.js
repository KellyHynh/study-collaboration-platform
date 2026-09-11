const readingService = require("../services/readingService");

// Get reading content of a lesson.
const getReading = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const reading = await readingService.getReading(lessonId);

        if (!reading) {
            return res.status(404).json({
                message: "Reading content not found",
            });
        }

        res.json(reading);
    } catch (error) {
        next(error);
    }
};

// Create reading content for a lesson.
const createReading = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const { body } = req.body;

        if (body === undefined || body === null) {
            return res.status(400).json({
                message: "body is required",
            });
        }

        const reading = await readingService.createReading(
            lessonId,
            body
        );

        res.status(201).json(reading);
    } catch (error) {
        next(error);
    }
};

// Update reading content.
const updateReading = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const { body } = req.body;

        if (body === undefined || body === null) {
            return res.status(400).json({
                message: "body is required",
            });
        }

        const reading = await readingService.updateReading(
            lessonId,
            body
        );

        if (!reading) {
            return res.status(404).json({
                message: "Reading content not found",
            });
        }

        res.json(reading);
    } catch (error) {
        next(error);
    }
};

// Delete reading content.
const deleteReading = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const deleted = await readingService.deleteReading(lessonId);

        if (!deleted) {
            return res.status(404).json({
                message: "Reading content not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getReading,
    createReading,
    updateReading,
    deleteReading,
};