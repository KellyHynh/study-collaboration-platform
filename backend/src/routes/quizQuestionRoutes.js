const express = require("express");
const quizQuestionController = require("../controllers/quizQuestionController");

const router = express.Router();

// Get all questions of a quiz.
router.get("/quizzes/:quizId", quizQuestionController.getQuestionsByQuiz);

// Create a question under a quiz.
router.post("/quizzes/:quizId", quizQuestionController.createQuestion);

// Get a single question.
router.get("/:id", quizQuestionController.getQuestion);

// Update a question.
router.patch("/:id", quizQuestionController.updateQuestion);

// Delete a question.
router.delete("/:id", quizQuestionController.deleteQuestion);

module.exports = router;