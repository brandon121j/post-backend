const mongoose = require('mongoose');

commentsSchema = new mongoose.Schema (
    {   
        post: {
            type: mongoose.Schema.ObjectId,
            ref: "posts"
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        },
        comment: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('comments', commentsSchema);