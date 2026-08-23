const express = require("express");
const router = express.Router();

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all categories - Student + Admin
router.get("/", protect, getCategories);

// Get one category - Student + Admin
router.get("/:id", protect, getCategory);

// Create category - Admin only
router.post("/", protect, adminOnly, createCategory);

// Update category - Admin only
router.put("/:id", protect, adminOnly, updateCategory);

// Delete category - Admin only
router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;