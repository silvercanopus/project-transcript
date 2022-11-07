const Script = require('../models/script');

module.exports.index = async (req, res, next) => {
    const scripts = await Script.find({});
    res.render('scripts/index', { scripts });
}

module.exports.renderNewScriptForm = async (req, res, next) => {
    res.render('scripts/new');
}

module.exports.createScript = async (req, res, next) => {
    const script = new Script(req.body.script);
    const lines = req.body.body.split('\n');
    for (let line of lines) {
        if (line.length > 0) {
            script.body.push(line);
        }
    }
    script.author = req.user._id;
    await script.save();
    req.flash('success', "Successfully made a new script");
    res.redirect(`/scripts/${script._id}`);
}

module.exports.showScript = async (req, res, next) => {
    const script = await Script.findById(req.params.id)
        .populate('author')
        .populate({
            path: 'translations',
            populate: {
                path: 'author'
            }
        })
        .populate({
            path: 'comments',
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

module.exports.deleteScript = async (req, res, next) => {
    await Script.findByIdAndDelete(req.params.id);
    req.flash('success', "Successfully deleted script.");
    res.redirect('/scripts');
}

module.exports.renderTranslateForm = async (req, res, next) => {
    const script = await Script.findById(req.params.id);
    if (!script) {
        req.flash('error', "Cannot find that script!");
        return res.redirect('/');
    }
    res.render('scripts/translate', { script });
}

module.exports.toggleLike = async (req, res, next) => {
    const id = req.params.id;
    const user = req.query.user;
    const script = await Script.findById(id);
    if (script.likes.includes(user)) {
        script.likes = script.likes.filter(u => u != user)
    }
    else {
        script.likes.push(user);
    }
    await script.save();
    res.redirect(`/scripts/${id}`);
}