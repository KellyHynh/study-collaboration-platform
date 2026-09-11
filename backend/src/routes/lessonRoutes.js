const express = require("express");
const lessonController = require("../controllers/lessonController");

const router = express.Router();

// Get all lessons of a chapter.
router.get("/chapters/:chapterId", lessonController.getLessonsByChapter);

// Create a lesson under a chapter.
router.post("/chapters/:chapterId", lessonController.createLesson);

// Get a single lesson.
router.get("/:id", lessonController.getLesson);

// Update a lesson.
router.patch("/:id", lessonController.updateLesson);

// Delete a lesson.
router.delete("/:id", lessonController.deleteLesson);

module.exports = router;