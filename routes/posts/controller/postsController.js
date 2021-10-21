const User = require('../../user/model/User');
const Posts = require('../../posts/model/Posts');


const createPost = async(req, res) => {
    try {
        console.log(res.locals)
        const { post } = req.body;

        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({ email: decodedData.email });

        const createdPost = new Posts ({
            post,
            user: foundUser._id
        });

        let savedPost = await createdPost.save();

        foundUser.posts.push(savedPost._id);

        await foundUser.save();

        res.json({ message: "SUCCESS", payload: createdPost });
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

const updatePost = async(req, res) => {
    try {
        let foundPost = await Posts.findById(req.params.id);

        if (!foundPost) {
            res.status(404).json({
                message: "ERROR",
                error: "POST NOT FOUND"
            });
        } else {
            let updatedPost = await Posts.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true }
            );

            res.json({ message: "SUCCESS", payload: updatedPost })
        }
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

const deletePost = async(req, res) => {
    try {
        let deletedPost = await Posts.findByIdAndDelete;

        if (!deletedPost) {
            res.status(404).json({
                message: "ERROR",
                error: "Post not found"
            });
        } else {
            const decodedData = res.locals.decodedData;
            let foundUser = await User.findOne({ email: decodedData.email });
            let usersPosts = foundUser.posts;

            let filteredPosts = usersPosts
                .filter((item) => { item._id.toString() !== req.params.id });

            foundUser.posts = filteredPosts;
            await foundUser.save();
            res.json({ message: "SUCCESS", deleted: deletedPost })
        }
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        })
    }
}

const getAllPosts = async(req, res) => {

    try {
        let allPosts = await Posts.find({});

        res.json({ message: "SUCCESS", payload: allPosts })
    } catch(error) {
        res.status(500).json({
            message: "ERROR",
            error: error.message
        });
    }
}


module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts
}