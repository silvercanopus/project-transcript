const AppError = require('./AppError');
const { scriptSchema } = require('./schemas');
const Script = require('../models/script');

module.exports.validateScript = (req, res, next) => {
    const { error } = scriptSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(400, msg);
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', "You must be logged in to perform this operation!");
        return res.redirect(`/login?returnTo=${req.originalUrl}`);
    }
    next();
}
