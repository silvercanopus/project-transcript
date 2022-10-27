const Translation = require('../models/translation');

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