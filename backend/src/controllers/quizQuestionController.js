const quizQuestionService = require("../services/quizQuestionService");

// Get all questions of a quiz.
const getQuestionsByQuiz = async (req, res, next) => {
    try {
        const { quizId } = req.params;

        const questions =
            await quizQuestionService.getQuestionsByQuizId(quizId);

        res.json(questions);
    } catch (error) {
        next(error);
    }
};

// Get a single question.
const getQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;

        const question =
            await quizQuestionService.getQuestionById(id);

        if (!question) {
            return res.status(404).json({
                message: "Quiz question not found",
            });
        }

        res.json(question);
    } catch (error) {
        next(error);
    }
};

// Create a question inside a quiz.
const createQuestion = async (req, res, next) => {
    try {
        const { quizId } = req.params;
        const {
            type,
            question,
            position,
            imageUrl,
            imageFileName,
            imageMimeType,
        } = req.body;

        // Required fields.
        if (!type || !question || position === undefined) {
            return res.status(400).json({
                message: "type, question and position are required",
            });
        }

        // Validate question type.
        if (!["multiple-choice", "essay"].includes(type)) {
            return res.status(400).json({
                message: "Invalid question type",
            });
        }

        // Position must be positive.
        if (!Number.isInteger(position) || position <= 0) {
            return res.status(400).json({
                message: "position must be a positive integer",
            });
        }

        const quizQuestion =
            await quizQuestionService.createQuestion(quizId, {
                type,
                question,
                position,
                imageUrl,
                imageFileName,
                imageMimeType,
            });

        res.status(201).json(quizQuestion);
    } catch (error) {
        next(error);
    }
};

// Update a question.
const updateQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            type,
            question,
            position,
            imageUrl,
            imageFileName,
            imageMimeType,
        } = req.body;

        // Validate type when provided.
        if (
            type !== undefined &&
            !["multiple-choice", "essay"].includes(type)
        ) {
            return res.status(400).json({
                message: "Invalid question type",
            });
        }

        // Validate position when provided.
        if (
            position !== undefined &&
            (!Number.isInteger(position) || position <= 0)
        ) {
            return res.status(400).json({
                message: "position must be a positive integer",
            });
        }

        const quizQuestion =
            await quizQuestionService.updateQuestion(id, {
                type,
                question,
                position,
                imageUrl,
                imageFileName,
                imageMimeType,
            });

        if (!quizQuestion) {
            return res.status(404).json({
                message: "Quiz question not found",
            });
        }

        res.json(quizQuestion);
    } catch (error) {
        next(error);
    }
};

// Delete a question.
const deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted =
            await quizQuestionService.deleteQuestion(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Quiz question not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getQuestionsByQuiz,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};