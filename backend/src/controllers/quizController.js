const quizService = require("../services/quizService");

// Get quiz of a lesson.
const getQuiz = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const quiz = await quizService.getQuizByLessonId(lessonId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        res.json(quiz);
    } catch (error) {
        next(error);
    }
};

// Create a quiz for a lesson.
const createQuiz = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const quiz = await quizService.createQuiz(lessonId);

        res.status(201).json(quiz);
    } catch (error) {
        next(error);
    }
};

// Update quiz metadata.
const updateQuiz = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const quiz = await quizService.updateQuiz(lessonId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        res.json(quiz);
    } catch (error) {
        next(error);
    }
};

// Delete a quiz.
const deleteQuiz = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const deleted = await quizService.deleteQuiz(lessonId);

        if (!deleted) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
};