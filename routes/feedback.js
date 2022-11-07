const express = require('express');
const feedback = require('../controllers/feedback');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isFeedbackAuthor } = require('../utils/middleware');

const router = express.Router();

router.route('/translations/:id/feedback')
    .post(isLoggedIn, catchAsync(feedback.createFeedback));

router.route('/feedback/:id')
    .get(catchAsync(feedback.showFeedback))
    .delete(isLoggedIn, isFeedbackAuthor, catchAsync(feedback.deleteFeedback));

module.exports = router;