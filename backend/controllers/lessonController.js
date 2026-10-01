
const Lesson = require("../models/Lesson");
const Video = require("../models/Video");

// Create a lesson

const createLesson = async (req, res) => {
    try {
        const {
            category,
            title,
            description,
            photos,
            videoUrls
        } = req.body;

        // Create lesson
        const lesson = await Lesson.create({
            category,
            title,
            description,
            photos
        });

        // Create multiple videos
        if (videoUrls && videoUrls.length > 0) {
            const videos = videoUrls.map((videoUrl) => ({
                lesson: lesson._id,
                title: title,
                video_url: videoUrl
            }));

            await Video.insertMany(videos);
        }

        res.status(201).json({
            message: "Lesson created successfully",
            lesson
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ==========================================
// Get all lessons
// ==========================================

const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find()
            .populate("category", "name description");

        res.status(200).json(lessons);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ==========================================
// Get one lesson
// ==========================================

const getLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
            .populate("category", "name description");

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        res.status(200).json(lesson);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ==========================================
// Update a lesson
// ==========================================

const updateLesson = async (req, res) => {
    try {
        const {
            category,
            title,
            description,
            photos,
            videoUrls
        } = req.body;

        // Update lesson
        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            {
                category,
                title,
                description,
                photos
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("category", "name description");

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        // ==========================================
        // Update multiple videos
        // ==========================================

        // Remove old videos belonging to this lesson
        await Video.deleteMany({
            lesson: lesson._id
        });

        // Create the new videos
        if (videoUrls && videoUrls.length > 0) {
            const videos = videoUrls.map((videoUrl) => ({
                lesson: lesson._id,
                title: title,
                video_url: videoUrl
            }));

            await Video.insertMany(videos);
        }

        res.status(200).json({
            message: "Lesson updated successfully",
            lesson
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ==========================================
// Delete a lesson
// ==========================================

const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        // Delete all videos belonging to this lesson
        await Video.deleteMany({
            lesson: lesson._id
        });

        res.status(200).json({
            message: "Lesson deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Export

module.exports = {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
};

