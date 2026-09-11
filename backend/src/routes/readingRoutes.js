const express = require("express");
const readingController = require("../controllers/readingController");

const router = express.Router();

// Get reading content.
router.get("/:lessonId", readingController.getReading);

// Create reading content.
router.post("/:lessonId", readingController.createReading);

// Update reading content.
router.put("/:lessonId", readingController.updateReading);

// Delete reading content.
router.delete("/:lessonId", readingController.deleteReading);

module.exports = router;