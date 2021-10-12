const mongoose = require('mongoose');

commentsSchema = new mongoose.Schema (
    {
        comment: {
            type: String
        },
    },
    {
        timestamps: true
    }
);