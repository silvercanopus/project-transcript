const express = require('express');
const scripts = require('../controllers/scripts');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/scripts')
    .get(catchAsync(scripts.index))

router.route('/scripts/:id')
    .get(catchAsync(scripts.showScript))

module.exports = router;