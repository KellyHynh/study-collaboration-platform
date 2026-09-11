const express = require("express");
const quizOptionController = require("../controllers/quizOptionController");

const router = express.Router();

// Get all options of a question.
router.get(
    "/questions/:questionId",
    quizOptionController.getOptionsByQuestion
);

// Create an option for a question.
router.post(
    "/questions/:questionId",
    quizOptionController.createOption
);

// Get a single option.
router.get("/:id", quizOptionController.getOption);

// Update an option.
router.patch("/:id", quizOptionController.updateOption);

// Delete an option.
router.delete("/:id", quizOptionController.deleteOption);

module.exports = router;