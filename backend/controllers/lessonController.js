const Lesson = require("../models/Lesson");

// Create a lesson
const createLesson = async (req, res) => {
    try {
        const { category, title, description, photo } = req.body;

        const lesson = await Lesson.create({
            category,
            title,
            description,
            photo
        });

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


// Get all lessons
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


// Get one lesson
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


// Update a lesson
const updateLesson = async (req, res) => {
    try {
        const { category, title, description, photo } = req.body;

        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            {
                category,
                title,
                description,
                photo
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


// Delete a lesson
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        res.status(200).json({
            message: "Lesson deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
};