const lessonAttachmentService = require("../services/lessonAttachmentService");

// Get all attachments of a lesson.
const getAttachmentsByLesson = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const attachments =
            await lessonAttachmentService
                .getAttachmentsByLessonId(lessonId);

        res.json(attachments);
    } catch (error) {
        next(error);
    }
};

// Get a single attachment.
const getAttachment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const attachment =
            await lessonAttachmentService
                .getAttachmentById(id);

        if (!attachment) {
            return res.status(404).json({
                message: "Attachment not found",
            });
        }

        res.json(attachment);
    } catch (error) {
        next(error);
    }
};

// Create an attachment.
const createAttachment = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const {
            fileUrl,
            fileName,
            mimeType,
        } = req.body;

        // Required attachment fields.
        if (!fileUrl || !fileName || !mimeType) {
            return res.status(400).json({
                message:
                    "fileUrl, fileName and mimeType are required",
            });
        }

        const attachment =
            await lessonAttachmentService.createAttachment(
                lessonId,
                {
                    fileUrl,
                    fileName,
                    mimeType,
                }
            );

        res.status(201).json(attachment);
    } catch (error) {
        next(error);
    }
};

// Update an attachment.
const updateAttachment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            fileUrl,
            fileName,
            mimeType,
        } = req.body;

        if (!fileUrl || !fileName || !mimeType) {
            return res.status(400).json({
                message:
                    "fileUrl, fileName and mimeType are required",
            });
        }

        const attachment =
            await lessonAttachmentService.updateAttachment(
                id,
                {
                    fileUrl,
                    fileName,
                    mimeType,
                }
            );

        if (!attachment) {
            return res.status(404).json({
                message: "Attachment not found",
            });
        }

        res.json(attachment);
    } catch (error) {
        next(error);
    }
};

// Delete an attachment.
const deleteAttachment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted =
            await lessonAttachmentService.deleteAttachment(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Attachment not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAttachmentsByLesson,
    getAttachment,
    createAttachment,
    updateAttachment,
    deleteAttachment,
};