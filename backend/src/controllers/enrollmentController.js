const enrollmentService = require("../services/enrollmentService");

// Create an enrollment.
const createEnrollment = async (req, res, next) => {
    try {
        const { userId, courseId } = req.body;

        // Both IDs are required.
        if (!userId || courseId === undefined) {
            return res.status(400).json({
                message: "userId and courseId are required",
            });
        }

        const enrollment = await enrollmentService.createEnrollment(
            userId,
            courseId
        );

        res.status(201).json(enrollment);
    } catch (error) {
        next(error);
    }
};

// Get all enrollments of a user.
const getEnrollmentsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const enrollments =
            await enrollmentService.getEnrollmentsByUserId(userId);

        res.json(enrollments);
    } catch (error) {
        next(error);
    }
};

// Get all enrollments of a course.
const getEnrollmentsByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const enrollments =
            await enrollmentService.getEnrollmentsByCourseId(courseId);

        res.json(enrollments);
    } catch (error) {
        next(error);
    }
};

// Get one enrollment.
const getEnrollment = async (req, res, next) => {
    try {
        const { userId, courseId } = req.params;

        const enrollment = await enrollmentService.getEnrollment(
            userId,
            courseId
        );

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found",
            });
        }

        res.json(enrollment);
    } catch (error) {
        next(error);
    }
};

// Update enrollment completion status.
const updateEnrollment = async (req, res, next) => {
    try {
        const { userId, courseId } = req.params;
        const { completedAt } = req.body;

        // completedAt can be a timestamp or null to reset completion.
        if (
            completedAt !== null &&
            completedAt !== undefined &&
            Number.isNaN(Date.parse(completedAt))
        ) {
            return res.status(400).json({
                message: "completedAt must be a valid date or null",
            });
        }

        const enrollment =
            await enrollmentService.updateEnrollment(
                userId,
                courseId,
                completedAt ?? null
            );

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found",
            });
        }

        res.json(enrollment);
    } catch (error) {
        next(error);
    }
};

// Delete an enrollment.
const deleteEnrollment = async (req, res, next) => {
    try {
        const { userId, courseId } = req.params;

        const deleted =
            await enrollmentService.deleteEnrollment(
                userId,
                courseId
            );

        if (!deleted) {
            return res.status(404).json({
                message: "Enrollment not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEnrollment,
    getEnrollmentsByUser,
    getEnrollmentsByCourse,
    getEnrollment,
    updateEnrollment,
    deleteEnrollment,
};