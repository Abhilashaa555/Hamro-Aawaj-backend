const express = require("express");
const router = express.Router();

const {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz
} = require("../controllers/quizController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all quizzes - Student + Admin
router.get("/", protect, getQuizzes);

// Get one quiz - Student + Admin
router.get("/:id", protect, getQuiz);

// Create quiz - Admin only
router.post("/", protect, adminOnly, createQuiz);

// Update quiz - Admin only
router.put("/:id", protect, adminOnly, updateQuiz);

// Delete quiz - Admin only
router.delete("/:id", protect, adminOnly, deleteQuiz);

module.exports = router;