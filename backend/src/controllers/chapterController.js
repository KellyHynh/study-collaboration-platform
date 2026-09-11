const chapterService = require("../services/chapterService");

// ============================================================
// Get all chapters belonging to a course
// ============================================================

const getChaptersByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const chapters =
            await chapterService.getChaptersByCourseId(courseId);

        res.json(chapters);
    } catch (error) {
        next(error);
    }
};

// ============================================================
// Get a single chapter
// ============================================================

const getChapter = async (req, res, next) => {
    try {
        const { id } = req.params;

        const chapter =
            await chapterService.getChapterById(id);

        if (!chapter) {
            return res.status(404).json({
                message: "Chapter not found",
            });
        }

        res.json(chapter);
    } catch (error) {
        next(error);
    }
};

// ============================================================
// Create a chapter inside a course
// Position is automatically assigned by the service.
// ============================================================

const createChapter = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { title, position } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "title is required",
            });
        }

        if (
            position !== undefined &&
            (!Number.isInteger(position) || position <= 0)
        ) {
            return res.status(400).json({
                message: "position must be a positive integer",
            });
        }

        const chapter =
            await chapterService.createChapter(courseId, {
                title: title.trim(),
                position,
            });

        res.status(201).json(chapter);
    } catch (error) {
        next(error);
    }
};

// ============================================================
// Update a chapter
// ============================================================

const updateChapter = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, position } = req.body;

        if (
            position !== undefined &&
            (!Number.isInteger(position) || position <= 0)
        ) {
            return res.status(400).json({
                message: "position must be a positive integer",
            });
        }

        const chapter =
            await chapterService.updateChapter(id, {
                title,
                position,
            });

        if (!chapter) {
            return res.status(404).json({
                message: "Chapter not found",
            });
        }

        res.json(chapter);
    } catch (error) {
        next(error);
    }
};

// ============================================================
// Delete a chapter
// ============================================================

const deleteChapter = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted =
            await chapterService.deleteChapter(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Chapter not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getChaptersByCourse,
    getChapter,
    createChapter,
    updateChapter,
    deleteChapter,
};
