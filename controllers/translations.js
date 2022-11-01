const Translation = require('../models/translation');
const Script = require('../models/script');

module.exports.showTranslation = async (req, res, next) => {
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
    res.render('translations/show', { translation });
}

module.exports.createTranslation = async (req, res, next) => {
    const script = await Script.findById(req.params.id);
    const translation = new Translation(req.body.translation);
    translation.author = req.user._id;
    translation.script = req.params.id;
    script.translations.push(translation);
    await translation.save();
    await script.save();
    req.flash('success', "Successfully submitted translation");
    res.redirect(`/translations/${translation._id}`);
}

module.exports.deleteTranslation = async (req, res, next) => {
    await Translation.findByIdAndDelete(req.params.id);
    req.flash('success', "Successfully deleted translation.");
    res.redirect('/scripts');
}