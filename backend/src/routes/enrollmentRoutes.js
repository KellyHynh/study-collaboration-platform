const express = require("express");
const enrollmentController = require("../controllers/enrollmentController");

const router = express.Router();

// Create an enrollment.
router.post("/", enrollmentController.createEnrollment);

// Get all enrollments of a user.
router.get("/users/:userId", enrollmentController.getEnrollmentsByUser);

// Get all enrollments of a course.
router.get("/courses/:courseId", enrollmentController.getEnrollmentsByCourse);

// Get one enrollment.
router.get(
    "/:userId/:courseId",
    enrollmentController.getEnrollment
);

// Update completion status.
router.patch(
    "/:userId/:courseId",
    enrollmentController.updateEnrollment
);

// Delete an enrollment.
router.delete(
    "/:userId/:courseId",
    enrollmentController.deleteEnrollment
);

module.exports = router;