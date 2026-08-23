const express = require("express");
const router = express.Router();

const {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
} = require("../controllers/lessonController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all lessons - Student + Admin
router.get("/", protect, getLessons);

// Get one lesson - Student + Admin
router.get("/:id", protect, getLesson);

// Create lesson - Admin only
router.post("/", protect, adminOnly, createLesson);

// Update lesson - Admin only
router.put("/:id", protect, adminOnly, updateLesson);

// Delete lesson - Admin only
router.delete("/:id", protect, adminOnly, deleteLesson);

module.exports = router;