const Quiz = require("../models/Quiz");

// Create a quiz
const createQuiz = async (req, res) => {
    try {
        const { lesson, title } = req.body;

        const quiz = await Quiz.create({
            lesson,
            title
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get all quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find()
            .populate("lesson", "title description");

        res.status(200).json(quizzes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get one quiz
const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate("lesson", "title description");

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.status(200).json(quiz);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update a quiz
const updateQuiz = async (req, res) => {
    try {
        const { lesson, title } = req.body;

        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            {
                lesson,
                title
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("lesson", "title description");

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            message: "Quiz updated successfully",
            quiz
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete a quiz
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            message: "Quiz deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz
};