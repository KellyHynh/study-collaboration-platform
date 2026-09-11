const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

// Get video content.
router.get("/:lessonId", videoController.getVideo);

// Create video content.
router.post("/:lessonId", videoController.createVideo);

// Update video content.
router.put("/:lessonId", videoController.updateVideo);

// Delete video content.
router.delete("/:lessonId", videoController.deleteVideo);

module.exports = router;