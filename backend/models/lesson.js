const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

       photos: {
    type: [String],
    default: []
},
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Lesson", lessonSchema);