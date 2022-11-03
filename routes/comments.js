const express = require('express');
const comments = require('../controllers/comments');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateComment, isCommentAuthor } = require('../utils/middleware');

const router = express.Router();

router.post('/scripts/:id/comments', isLoggedIn, validateComment, catchAsync(comments.createComment));

router.delete('/scripts/:id/comments/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment));

module.exports = router;