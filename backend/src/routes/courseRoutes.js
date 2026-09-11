const express = require("express");

const courseController = require("../controllers/courseController");

const router = express.Router();

// Get all courses.
router.get("/", courseController.getAllCourses);

// Get a single course.
router.get("/:id", courseController.getCourse);

router.get("/:id/curriculum", courseController.getCourseCurriculum);
// Create a course.
router.post("/", courseController.createCourse);

// Update a course.
router.patch("/:id", courseController.updateCourse);

// Delete a course.
router.delete("/:id", courseController.deleteCourse);

router.get(
    "/:id/enrollment",
    courseController.getCourseEnrollment
);

router.get(
    "/:id/progress",
    courseController.getCourseProgress
);

module.exports = router;