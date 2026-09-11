const express = require("express");
const lessonProgressController = require("../controllers/lessonProgressController");

const router = express.Router();

// Create a progress record.
router.post("/", lessonProgressController.createProgress);

// Get all progress records of a user.
router.get("/users/:userId", lessonProgressController.getProgressByUser);

// Get all progress records of a lesson.
router.get(
    "/lessons/:lessonId",
    lessonProgressController.getProgressByLesson
);

// Get one progress record.
router.get(
    "/:userId/:lessonId",
    lessonProgressController.getProgress
);

// Update completion status.
router.patch(
    "/:userId/:lessonId",
    lessonProgressController.updateProgress
);

// Delete a progress record.
router.delete(
    "/:userId/:lessonId",
    lessonProgressController.deleteProgress
);

module.exports = router;