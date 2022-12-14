const Translation = require('../models/translation');
const Script = require('../models/script');
const User = require('../models/user');

module.exports.showTranslation = async (req, res, next) => {
    const translation = await Translation.findById(req.params.id).populate('author').populate({
        path: 'script',
        populate: {
            path: 'author'
        }
    }).populate({
        path: 'feedback',
        populate: {
            path: 'author'
        }
    });
    if (!translation) {
        req.flash('error', "Cannot find that translation!");
        return res.redirect('/');
    }
    res.render('translations/show', { translation });
}

module.exports.createTranslation = async (req, res, next) => {
    const script = await Script.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    const translation = new Translation(req.body.translation);
    const lines = req.body.body.split('\n');
    for (let line of lines) {
        if (line.length > 0) {
            translation.body.push(line);
        }
    }
    translation.author = req.user._id;
    translation.script = req.params.id;
    script.translations.push(translation);
    currentUser.translations.push(translation);
    await translation.save();
    await script.save();
    await currentUser.save();
    req.flash('success', "Successfully submitted translation");
    res.redirect(`/translations/${translation._id}`);
}

module.exports.deleteTranslation = async (req, res, next) => {
    await Translation.findByIdAndDelete(req.params.id);
    req.flash('success', "Successfully deleted translation.");
    res.redirect('/scripts');
}

module.exports.renderNewFeedbackForm = async (req, res, next) => {
    const translation = await Translation.findById(req.params.id).populate('author').populate({
        path: 'script',
        populate: {
            path: 'author'
        }
    });
    if (!translation) {
        req.flash('error', "Cannot find that translation!");
        return res.redirect('/');
    }
    res.render('feedback/new', { translation });
}