const lessonProgressService = require("../services/lessonProgressService");

// Create a progress record.
const createProgress = async (req, res, next) => {
    try {
        const { userId, lessonId } = req.body;

        // Both IDs are required.
        if (!userId || lessonId === undefined) {
            return res.status(400).json({
                message: "userId and lessonId are required",
            });
        }

        const progress = await lessonProgressService.createProgress(
            userId,
            lessonId
        );

        res.status(201).json(progress);
    } catch (error) {
        next(error);
    }
};

// Get all progress records of a user.
const getProgressByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const progress =
            await lessonProgressService.getProgressByUserId(userId);

        res.json(progress);
    } catch (error) {
        next(error);
    }
};

// Get all users' progress for a lesson.
const getProgressByLesson = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const progress =
            await lessonProgressService.getProgressByLessonId(lessonId);

        res.json(progress);
    } catch (error) {
        next(error);
    }
};

// Get one progress record.
const getProgress = async (req, res, next) => {
    try {
        const { userId, lessonId } = req.params;

        const progress = await lessonProgressService.getProgress(
            userId,
            lessonId
        );

        if (!progress) {
            return res.status(404).json({
                message: "Lesson progress not found",
            });
        }

        res.json(progress);
    } catch (error) {
        next(error);
    }
};

// Update lesson completion status.
const updateProgress = async (req, res, next) => {
    try {
        const { userId, lessonId } = req.params;
        const { completedAt } = req.body;

        // completedAt can be a valid date or null.
        if (
            completedAt !== null &&
            completedAt !== undefined &&
            Number.isNaN(Date.parse(completedAt))
        ) {
            return res.status(400).json({
                message: "completedAt must be a valid date or null",
            });
        }

        const progress =
            await lessonProgressService.updateProgress(
                userId,
                lessonId,
                completedAt ?? null
            );

        if (!progress) {
            return res.status(404).json({
                message: "Lesson progress not found",
            });
        }

        res.json(progress);
    } catch (error) {
        next(error);
    }
};

// Delete a progress record.
const deleteProgress = async (req, res, next) => {
    try {
        const { userId, lessonId } = req.params;

        const deleted =
            await lessonProgressService.deleteProgress(
                userId,
                lessonId
            );

        if (!deleted) {
            return res.status(404).json({
                message: "Lesson progress not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const getCourseProgress = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userId =
            "ec8574c6-f44d-40e0-ba80-68e1d0aa9da9";

        const progress =
            await lessonProgressService.getCourseProgress(
                userId,
                id
            );

        res.json(progress);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProgress,
    getProgressByUser,
    getProgressByLesson,
    getCourseProgress,
    getProgress,
    updateProgress,
    deleteProgress,
};