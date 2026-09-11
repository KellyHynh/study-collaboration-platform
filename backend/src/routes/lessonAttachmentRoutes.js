const express = require("express");
const lessonAttachmentController = require(
    "../controllers/lessonAttachmentController"
);

const router = express.Router();

// Get all attachments of a lesson.
router.get(
    "/lessons/:lessonId",
    lessonAttachmentController.getAttachmentsByLesson
);

// Create an attachment for a lesson.
router.post(
    "/lessons/:lessonId",
    lessonAttachmentController.createAttachment
);

// Get a single attachment.
router.get(
    "/:id",
    lessonAttachmentController.getAttachment
);

// Update an attachment.
router.patch(
    "/:id",
    lessonAttachmentController.updateAttachment
);

// Delete an attachment.
router.delete(
    "/:id",
    lessonAttachmentController.deleteAttachment
);

module.exports = router;