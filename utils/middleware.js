const AppError = require('./AppError');
const { scriptSchema, translationSchema, commentSchema } = require('./schemas');
const Script = require('../models/script');
const Translation = require('../models/translation');
const Comment = require('../models/comment');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', "You must be logged in to perform this operation!");
        return res.redirect(`/login?returnTo=${req.originalUrl}`);
    }
    next();
}

module.exports.validateScript = (req, res, next) => {
    const { error } = scriptSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(400, msg);
    }
    next();
}

module.exports.isScriptAuthor = async (req, res, next) => {
    const { id } = req.params;
    const script = await Script.findById(id);
    if (req.user && script.author.equals(req.user._id)) {
        // a user needs to be logged in and that user needs to be the script's author
        next();
    }
    else {
        req.flash('error', "You don't have permission to perform this operation!");
        res.redirect(`/scripts/${id}`);
    }
}

module.exports.validateTranslation = (req, res, next) => {
    const { error } = translationSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(400, msg);
    }
    next();
}

module.exports.isTranslationAuthor = async (req, res, next) => {
    const { id } = req.params;
    const translation = await Translation.findById(id);
    if (req.user && translation.author.equals(req.user._id)) {
        // a user needs to be logged in and that user needs to be the translation's author
        next();
    }
    else {
        req.flash('error', "You don't have permission to perform this operation!");
        res.redirect(`/translations/${id}`);
    }
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(400, msg);
    }
    next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (req.user && comment.author.equals(req.user._id)) {
        // a user needs to be logged in and that user needs to be the comment's author
        next();
    }
    else {
        req.flash('error', "You don't have permission to perform this operation!");
        res.redirect(`/scripts/${id}`);
    }
}
