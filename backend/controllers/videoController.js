const Video = require("../models/Video");

// Create a video
const createVideo = async (req, res) => {
    try {
        const { lesson, title, video_url } = req.body;

        const video = await Video.create({
            lesson,
            title,
            video_url
        });

        res.status(201).json({
            message: "Video created successfully",
            video
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get all videos
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate("lesson", "title description");

        res.status(200).json(videos);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get one video
const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate("lesson", "title description");

        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        res.status(200).json(video);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update a video
const updateVideo = async (req, res) => {
    try {
        const { lesson, title, video_url } = req.body;

        const video = await Video.findByIdAndUpdate(
            req.params.id,
            {
                lesson,
                title,
                video_url
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("lesson", "title description");

        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        res.status(200).json({
            message: "Video updated successfully",
            video
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete a video
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);

        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        res.status(200).json({
            message: "Video deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createVideo,
    getVideos,
    getVideo,
    updateVideo,
    deleteVideo
};