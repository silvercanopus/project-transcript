const express = require('express');
const translations = require('../controllers/translations');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateTranslation, isTranslationAuthor } = require('../utils/middleware');

const router = express.Router();

router.route('/scripts/:id/translate')
    .post(isLoggedIn, validateTranslation, catchAsync(translations.createTranslation));

router.route('/translations/:id')
    .get(catchAsync(translations.showTranslation))
    .delete(isLoggedIn, isTranslationAuthor, catchAsync(translations.deleteTranslation));

module.exports = router;