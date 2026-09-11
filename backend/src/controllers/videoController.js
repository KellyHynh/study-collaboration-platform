const videoService = require("../services/videoService");

// Get video content of a lesson.
const getVideo = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const video = await videoService.getVideo(lessonId);

        if (!video) {
            return res.status(404).json({
                message: "Video content not found",
            });
        }

        res.json(video);
    } catch (error) {
        next(error);
    }
};

// Create video content for a lesson.
const createVideo = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const {
            videoUrl,
            fileName,
            mimeType,
        } = req.body;

        // Required fields.
        if (!videoUrl || !fileName || !mimeType) {
            return res.status(400).json({
                message: "videoUrl, fileName and mimeType are required",
            });
        }

        const video = await videoService.createVideo(lessonId, {
            videoUrl,
            fileName,
            mimeType,
        });

        res.status(201).json(video);
    } catch (error) {
        next(error);
    }
};

// Update video content.
const updateVideo = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const {
            videoUrl,
            fileName,
            mimeType,
        } = req.body;

        // Required fields.
        if (!videoUrl || !fileName || !mimeType) {
            return res.status(400).json({
                message: "videoUrl, fileName and mimeType are required",
            });
        }

        const video = await videoService.updateVideo(lessonId, {
            videoUrl,
            fileName,
            mimeType,
        });

        if (!video) {
            return res.status(404).json({
                message: "Video content not found",
            });
        }

        res.json(video);
    } catch (error) {
        next(error);
    }
};

// Delete video content.
const deleteVideo = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const deleted = await videoService.deleteVideo(lessonId);

        if (!deleted) {
            return res.status(404).json({
                message: "Video content not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo,
};