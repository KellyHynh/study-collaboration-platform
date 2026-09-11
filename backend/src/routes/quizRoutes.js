const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

// Get quiz of a lesson.
router.get("/:lessonId", quizController.getQuiz);

// Create a quiz for a lesson.
router.post("/:lessonId", quizController.createQuiz);

// Update quiz metadata.
router.put("/:lessonId", quizController.updateQuiz);

// Delete a quiz.
router.delete("/:lessonId", quizController.deleteQuiz);

module.exports = router;