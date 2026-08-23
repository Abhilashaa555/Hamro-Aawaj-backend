const express = require("express");
const router = express.Router();

const {
    createVideo,
    getVideos,
    getVideo,
    updateVideo,
    deleteVideo
} = require("../controllers/videoController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all videos - Student + Admin
router.get("/", protect, getVideos);

// Get one video - Student + Admin
router.get("/:id", protect, getVideo);

// Create video - Admin only
router.post("/", protect, adminOnly, createVideo);

// Update video - Admin only
router.put("/:id", protect, adminOnly, updateVideo);

// Delete video - Admin only
router.delete("/:id", protect, adminOnly, deleteVideo);

module.exports = router;