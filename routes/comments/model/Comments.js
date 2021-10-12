const mongoose = require('mongoose');

commentsSchema = new mongoose.Schema (
    {   
        originalPoster: {
            type: String
        },
        user: {
            type: String
        },
        comment: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('comments', commentsSchema);