const quizOptionService = require("../services/quizOptionService");

// Get all options of a question.
const getOptionsByQuestion = async (req, res, next) => {
    try {
        const { questionId } = req.params;

        const options =
            await quizOptionService.getOptionsByQuestionId(questionId);

        res.json(options);
    } catch (error) {
        next(error);
    }
};

// Get a single option.
const getOption = async (req, res, next) => {
    try {
        const { id } = req.params;

        const option = await quizOptionService.getOptionById(id);

        if (!option) {
            return res.status(404).json({
                message: "Quiz option not found",
            });
        }

        res.json(option);
    } catch (error) {
        next(error);
    }
};

// Create an option for a question.
const createOption = async (req, res, next) => {
    try {
        const { questionId } = req.params;
        const {
            optionKey,
            text,
            isCorrect,
            position,
        } = req.body;

        // Required fields.
        if (!optionKey || !text || position === undefined) {
            return res.status(400).json({
                message: "optionKey, text and position are required",
            });
        }

        // Position must be positive.
        if (!Number.isInteger(position) || position <= 0) {
            return res.status(400).json({
                message: "position must be a positive integer",
            });
        }

        // isCorrect must be boolean when provided.
        if (
            isCorrect !== undefined &&
            typeof isCorrect !== "boolean"
        ) {
            return res.status(400).json({
                message: "isCorrect must be a boolean",
            });
        }

        const option = await quizOptionService.createOption(
            questionId,
            {
                optionKey,
                text,
                isCorrect,
                position,
            }
        );

        res.status(201).json(option);
    } catch (error) {
        next(error);
    }
};

// Update an option.
const updateOption = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            optionKey,
            text,
            isCorrect,
            position,
        } = req.body;

        // Validate isCorrect when provided.
        if (
            isCorrect !== undefined &&
            typeof isCorrect !== "boolean"
        ) {
            return res.status(400).json({
                message: "isCorrect must be a boolean",
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

        const option = await quizOptionService.updateOption(id, {
            optionKey,
            text,
            isCorrect,
            position,
        });

        if (!option) {
            return res.status(404).json({
                message: "Quiz option not found",
            });
        }

        res.json(option);
    } catch (error) {
        next(error);
    }
};

// Delete an option.
const deleteOption = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await quizOptionService.deleteOption(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Quiz option not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOptionsByQuestion,
    getOption,
    createOption,
    updateOption,
    deleteOption,
};