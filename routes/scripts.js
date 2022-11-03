const express = require('express');
const scripts = require('../controllers/scripts');
const catchAsync = require('../utils/catchAsync');
const { validateScript, isLoggedIn, isScriptAuthor } = require('../utils/middleware');

const router = express.Router();

router.route('/scripts')
    .get(catchAsync(scripts.index))
    .post(isLoggedIn, validateScript, catchAsync(scripts.createScript));

router.route('/scripts/new')
    .get(isLoggedIn, catchAsync(scripts.renderNewScriptForm));

router.route('/scripts/:id')
    .get(catchAsync(scripts.showScript))
    .delete(isLoggedIn, isScriptAuthor, catchAsync(scripts.deleteScript));

router.route('/scripts/:id/translate')
    .get(isLoggedIn, catchAsync(scripts.renderTranslateForm));

router.route('/scripts/:id/like')
    .put(isLoggedIn, catchAsync(scripts.toggleLike));

module.exports = router;