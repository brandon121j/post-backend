var express = require('express');
var router = express.Router();
const { checkIsEmpty, checkIsUndefined } = require('../user/lib/index');
var { jwtMiddleware } = require('../user/lib/shared/jwtMiddleware');
const { createPost, updatePost, deletePost, getAllPosts } = require('./controller/postsController');


router.post('/create-post', checkIsUndefined, checkIsEmpty, jwtMiddleware, createPost);

router.put('/update-post/:id', checkIsUndefined, checkIsEmpty, jwtMiddleware, updatePost);

router.delete('/delete-post/:id', jwtMiddleware, deletePost);

router.get('/', getAllPosts);

module.exports = router;