const express = require('express');
const scripts = require('../controllers/scripts');
const catchAsync = require('../utils/catchAsync');
const { validateScript, isLoggedIn } = require('../utils/middleware');

const router = express.Router();

router.route('/scripts')
    .get(catchAsync(scripts.index))
    .post(isLoggedIn, validateScript, catchAsync(scripts.createScript));

router.route('/scripts/new')
    .get(isLoggedIn, catchAsync(scripts.renderNewScriptForm));

router.route('/scripts/:id')
    .get(catchAsync(scripts.showScript));

module.exports = router;