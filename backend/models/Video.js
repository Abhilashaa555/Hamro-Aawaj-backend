const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
    {
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        video_url: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Video", videoSchema);