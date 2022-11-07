const express = require('express');
const translations = require('../controllers/translations');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateTranslation, isTranslationAuthor, isNotTranslationAuthor } = require('../utils/middleware');

const router = express.Router();

router.route('/scripts/:id/translate')
    .post(isLoggedIn, validateTranslation, catchAsync(translations.createTranslation));

router.route('/translations/:id')
    .get(catchAsync(translations.showTranslation))
    .delete(isLoggedIn, isTranslationAuthor, catchAsync(translations.deleteTranslation));

router.route('/translations/:id/feedback')
    .get(isLoggedIn, isNotTranslationAuthor, catchAsync(translations.renderNewFeedbackForm));

module.exports = router;