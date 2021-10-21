const Comment = require('../model/Comments');
const User = require('../../user/model/User');
const Posts = require('../../posts/model/Posts');

async function createComment(req, res) {
    try {

        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({ email: decodedData.email });

        let createdComment = new Comment ({
            comment: req.body.comment,
            post: req.params.id,
            user: foundUser._id
        });

        let savedComment = await createdComment.save();

        foundUser.comments.push(savedComment._id);

        await foundUser.save()

        let foundPost = await Posts.findById(req.params.id);

        foundPost.comments.push(savedComment._id);

        await foundPost.save();

        res.json({ message: "SUCCESS", payload: savedComment });

    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

async function getAllComments(req, res) {
    try {
        let allComments = await Comment.find({}).populate("post comment");

        res.json({ message: "SUCCESS", payload: allComments })
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

async function deleteComment(req, res) {

    try {

        let deletedComment = await Comment.findByIdAndDelete(req.params.id);

        let foundPost = await Posts.findById(deletedComment.post);

        let foundPostComments = foundPost.comments;

        let filteredComments = foundPostComments
            .filter((item) => { `${item._id}` !== `${deletedComment._id}` });

        foundPost.comments = filteredComments;

        await foundPost.save();

        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({ email: decodedData.email });

        let foundUsersComments = foundUser.comments;

        filteredUsersComments = foundUsersComments.filter(
            (items) => { `${items._id}` !== `${deletedComment._id}` }
        );

        foundUser.comments = filteredUsersComments;

        await foundUser.save();

        res.json({ message: "SUCCESS", payload: deletedComment})
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

async function getUsersComments(req, res) {
    try {
        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({ email: decodedData.email });

        let allComments = await Comment.find({ users: foundUser._id });

        res.json({ message: "SUCCESS", payload: allComments });
    
    } catch(e) {
        res.status(500).json({
            message: "ERROR",
            error: e.message
        })
    }
}

module.exports = {
    createComment,
    getAllComments,
    deleteComment,
    getUsersComments,
}