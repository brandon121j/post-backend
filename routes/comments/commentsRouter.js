const express = require('express');
const router = express.Router();
const { jwtMiddleware } = require('../user/lib/shared/jwtMiddleware');
const { createComment, getAllComments, deleteComment, getUsersComments, deleteAllComments } = require('../comments/controller/commentsController');
const { checkIsUndefined, checkIsEmpty } = require('../user/lib/index');

router.post('/create-comment/:id', checkIsUndefined, checkIsEmpty, jwtMiddleware, createComment);

router.get('/', getAllComments);

router.delete('/delete-comment/:id', jwtMiddleware, deleteComment);

router.get('/get-users-comments', jwtMiddleware, getUsersComments);


module.exports = router;