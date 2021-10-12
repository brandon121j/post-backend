const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fistName : {
            type: String
        },
        lastName: {
            type: String
        },
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        posts: [{ type: mongoose.Schema.Types.String}],
        comments: [{ type: mongoose.Schema.Types.String}]
        
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', userSchema)