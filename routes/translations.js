const express = require('express');
const translations = require('../controllers/translations');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/translations/:id')
    .get(catchAsync(translations.showTranslation))

module.exports = router;