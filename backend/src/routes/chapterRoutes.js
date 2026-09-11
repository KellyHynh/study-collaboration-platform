const express = require("express");
const chapterController = require("../controllers/chapterController");

const router = express.Router();

// Get all chapters of a course
router.get("/courses/:courseId", chapterController.getChaptersByCourse);

// Create a chapter under a course
router.post("/courses/:courseId", chapterController.createChapter);

// Get a single chapter
router.get("/:id", chapterController.getChapter);

// Update a chapter
router.patch("/:id", chapterController.updateChapter);

// Delete a chapter
router.delete("/:id", chapterController.deleteChapter);

module.exports = router;