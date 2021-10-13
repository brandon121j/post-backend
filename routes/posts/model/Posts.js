const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        post: {
            type: String
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        },
        comments: [{ type: mongoose.Schema.ObjectId, ref: "comments" }]
    }
);

module.exports = mongoose.model("posts", postSchema);