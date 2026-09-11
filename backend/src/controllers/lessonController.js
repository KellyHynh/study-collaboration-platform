const lessonService = require("../services/lessonService");
const readingService = require("../services/readingService");
const lessonAttachmentService = require("../services/lessonAttachmentService");
const videoService = require("../services/videoService");
const quizService = require("../services/quizService");
const quizQuestionService = require("../services/quizQuestionService");
const quizOptionService = require("../services/quizOptionService");

const saveQuizContent = async (lessonId, content) => {
    const existingQuiz = await quizService.getQuizByLessonId(lessonId);

    if (existingQuiz) {
        await quizService.deleteQuiz(lessonId);
    }

    const quiz = await quizService.createQuiz(lessonId);
    const questions = Array.isArray(content?.questions) ? content.questions : [];

    for (const [questionIndex, question] of questions.entries()) {
        const image = question.image || {};
        const imageUrl = image.imageUrl || image.previewUrl || null;

        if (!question.question?.trim() && !imageUrl) continue;

        const savedQuestion = await quizQuestionService.createQuestion(quiz.lessonId, {
            type: question.type,
            question: question.question?.trim() || "",
            position: questionIndex + 1,
            imageUrl,
            imageFileName: image.fileName || null,
            imageMimeType: image.mimeType || null,
        });

        if (question.type === "multiple-choice") {
            const options = Array.isArray(question.options) ? question.options : [];

            for (const [optionIndex, option] of options.entries()) {
                if (!option.text?.trim()) continue;

                await quizOptionService.createOption(savedQuestion.id, {
                    optionKey: option.optionKey || String.fromCharCode(65 + optionIndex),
                    text: option.text.trim(),
                    isCorrect: option.isCorrect === true,
                    position: optionIndex + 1,
                });
            }
        }
    }
};

const saveLessonContent = async (lessonId, content) => {
    if (!content) return;

    if (content.video?.videoUrl) {
        const existing = await videoService.getVideo(lessonId);
        const videoData = {
            videoUrl: content.video.videoUrl,
            fileName: content.video.fileName,
            mimeType: content.video.mimeType,
        };

        if (existing) {
            await videoService.updateVideo(lessonId, videoData);
        } else {
            await videoService.createVideo(lessonId, videoData);
        }
    } else if (content.video !== undefined) {
        await videoService.deleteVideo(lessonId);
    }

    if (content.body !== undefined) {
        const existing = await readingService.getReading(lessonId);
        const body = JSON.stringify(content.body);

        if (existing) {
            await readingService.updateReading(lessonId, body);
        } else {
            await readingService.createReading(lessonId, body);
        }
    }

    if (Array.isArray(content.attachments)) {
        const existing = await lessonAttachmentService
            .getAttachmentsByLessonId(lessonId);
        const incomingIds = new Set(
            content.attachments.map((attachment) => Number(attachment.id))
        );

        await Promise.all(
            existing
                .filter((attachment) => !incomingIds.has(Number(attachment.id)))
                .map((attachment) =>
                    lessonAttachmentService.deleteAttachment(attachment.id)
                )
        );

        await Promise.all(
            content.attachments.map(async (attachment) => {
                if (!attachment.fileUrl) return;

                if (Number.isInteger(Number(attachment.id)) &&
                    existing.some((item) => Number(item.id) === Number(attachment.id))) {
                    return;
                }

                await lessonAttachmentService.createAttachment(lessonId, {
                    fileUrl: attachment.fileUrl,
                    fileName: attachment.fileName,
                    mimeType: attachment.mimeType,
                });
            })
        );
    }
};

// Get all lessons belonging to a chapter.
const getLessonsByChapter = async (req, res, next) => {
    try {
        const { chapterId } = req.params;

        const lessons = await lessonService.getLessonsByChapterId(chapterId);

        res.json(lessons);
    } catch (error) {
        next(error);
    }
};

// Get a single lesson.
const getLesson = async (req, res, next) => {
    try {
        const { id } = req.params;

        const lesson = await lessonService.getLessonById(id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found",
            });
        }

        res.json(lesson);
    } catch (error) {
        next(error);
    }
};

// Create a lesson inside a chapter.
const createLesson = async (req, res, next) => {
    try {
        const { chapterId } = req.params;
        const {
            title,
            type,
            position,
            durationSeconds,
            isLocked,
            content,
        } = req.body;

        // Required fields.
        if (!title || !type || position === undefined) {
            return res.status(400).json({
                message: "title, type and position are required",
            });
        }

        // Lesson type must match the database constraint.
        if (!["reading", "video", "quiz"].includes(type)) {
            return res.status(400).json({
                message: "Invalid lesson type",
            });
        }

        // Position must be a positive integer.
        if (!Number.isInteger(position) || position <= 0) {
            return res.status(400).json({
                message: "position must be a positive integer",
            });
        }

        // Duration must be a non-negative integer.
        if (
            durationSeconds !== undefined &&
            (!Number.isInteger(durationSeconds) || durationSeconds < 0)
        ) {
            return res.status(400).json({
                message: "durationSeconds must be a non-negative integer",
            });
        }

        // isLocked must be boolean when provided.
        if (
            isLocked !== undefined &&
            typeof isLocked !== "boolean"
        ) {
            return res.status(400).json({
                message: "isLocked must be a boolean",
            });
        }

        const lesson = await lessonService.createLesson(chapterId, {
            title,
            type,
            position,
            durationSeconds,
            isLocked,
        });

        if (type === "quiz") {
            await saveQuizContent(lesson.id, content);
        } else {
            await saveLessonContent(lesson.id, content);
        }

        res.status(201).json(await lessonService.getLessonById(lesson.id));
    } catch (error) {
        next(error);
    }
};

// Update a lesson.
const updateLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            title,
            type,
            position,
            durationSeconds,
            isLocked,
            content,
        } = req.body;

        // Validate type only when provided.
        if (
            type !== undefined &&
            !["reading", "video", "quiz"].includes(type)
        ) {
            return res.status(400).json({
                message: "Invalid lesson type",
            });
        }

        // Validate position only when provided.
        if (
            position !== undefined &&
            (!Number.isInteger(position) || position <= 0)
        ) {
            return res.status(400).json({
                message: "position must be a positive integer",
            });
        }

        // Validate duration only when provided.
        if (
            durationSeconds !== undefined &&
            (!Number.isInteger(durationSeconds) || durationSeconds < 0)
        ) {
            return res.status(400).json({
                message: "durationSeconds must be a non-negative integer",
            });
        }

        // Validate isLocked only when provided.
        if (
            isLocked !== undefined &&
            typeof isLocked !== "boolean"
        ) {
            return res.status(400).json({
                message: "isLocked must be a boolean",
            });
        }

        const lesson = await lessonService.updateLesson(id, {
            title,
            type,
            position,
            durationSeconds,
            isLocked,
        });

        if (type === "quiz") {
            await saveQuizContent(id, content);
        } else {
            await saveLessonContent(id, content);
        }

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found",
            });
        }

        res.json(await lessonService.getLessonById(id));
    } catch (error) {
        next(error);
    }
};

// Delete a lesson.
const deleteLesson = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await lessonService.deleteLesson(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Lesson not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getLessonsByChapter,
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson,
};