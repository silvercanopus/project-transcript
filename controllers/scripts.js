const Script = require('../models/script');

module.exports.index = async(req, res, next) => {
    const scripts = await Script.find({});
    res.render('scripts/index', { scripts });
}

module.exports.showScript = async (req, res, next) => {
    const script = await Script.findById(req.params.id).populate('author').populate({
        path: 'translations',
        populate: {
            path: 'author'
        }
    });
    if (!script) {
        req.flash('error', "Cannot find that script!");
        return res.redirect('/');
    }
    res.render('scripts/show', { script });
}