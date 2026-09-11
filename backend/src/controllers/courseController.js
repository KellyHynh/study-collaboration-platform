const courseService = require("../services/courseService");
const enrollmentService = require("../services/enrollmentService");
const lessonProgressService =
    require("../services/lessonProgressService");

// Get all courses.
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getAllCourses();

        res.json(courses);
    } catch (error) {
        next(error);
    }
};

// Get a single course.
const getCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await courseService.getCourseById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.json(course);
    } catch (error) {
        next(error);
    }
};

// Get course curriculum with chapters and lessons.
const getCourseCurriculum = async (req, res, next) => {
    try {
        const { id } = req.params;

        const curriculum =
            await courseService.getCourseCurriculum(id);

        if (!curriculum) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.json(curriculum);
    } catch (error) {
        next(error);
    }
};

// Create a course.
const createCourse = async (req, res, next) => {
    try {
        const {
            ownerId,
            title,
            thumbnailUrl,
            categoryId,
            level,
            tags,
            description,
            learningOutcomes,
            requirements,
            visibility,
            language,
        } = req.body;

        if (!ownerId || !title || !categoryId || !level || !language) {
            return res.status(400).json({
                message:
                    "ownerId, title, categoryId, level and language are required",
            });
        }

        if (!/^\d+$/.test(String(categoryId))) {
            return res.status(400).json({
                message: "categoryId must be a numeric category ID",
            });
        }

        if (!["beginner", "intermediate", "advanced"].includes(level)) {
            return res.status(400).json({
                message: "Invalid course level",
            });
        }

        if (!["public", "private"].includes(visibility ?? "public")) {
            return res.status(400).json({
                message: "Invalid course visibility",
            });
        }

        if (!["en", "vi"].includes(language)) {
            return res.status(400).json({
                message: "Invalid course language",
            });
        }

        const joinCode = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        const course = await courseService.createCourse({
            ownerId,
            title,
            thumbnailUrl,
            categoryId,
            level,
            tags,
            description,
            learningOutcomes,
            requirements,
            visibility,
            joinCode,
            language,
        });

        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
};

// Update a course.
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await courseService.updateCourse(id, req.body);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.json(course);
    } catch (error) {
        next(error);
    }
};

// Delete a course.
const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await courseService.deleteCourse(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const getCourseEnrollment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userId =
            "ec8574c6-f44d-40e0-ba80-68e1d0aa9da9";

        const enrollment =
            await enrollmentService.getCourseEnrollment(
                id,
                userId
            );

        res.json(enrollment);
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
    getAllCourses,
    getCourse,
    getCourseCurriculum,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseEnrollment,
    getCourseProgress,
};
