const Feedback = require('../models/feedback');
const Translation = require('../models/translation');

module.exports.showFeedback = async (req, res, next) => {
    const feedback = await Feedback.findById(req.params.id).populate('author').populate({
        path: 'translation',
        populate: {
            path: 'author'
        }
    }).populate({
        path: 'translation',
        populate: {
            path: 'script',
            populate: {
                path: 'author'
            }
        }
    });
    console.log(feedback);
    console.log(feedback.translation);
    console.log(feedback.translation.author);
    if (!feedback) {
        req.flash('error', "Cannot find that feedback!");
        return res.redirect('/');
    }
    res.render('feedback/show', { feedback });
}

module.exports.createFeedback = async (req, res, next) => {
    const feedback = new Feedback();
    feedback.translation = req.params.id;
    feedback.marks = req.body.marks;
    feedback.comments = req.body.comments;
    feedback.author = req.user._id;
    const translation = await Translation.findById(req.params.id);
    translation.feedback.push(feedback);
    await feedback.save();
    await translation.save();
    req.flash('success', "Successfully submitted feedback");
    res.redirect(`/feedback/${feedback._id}`);
}

module.exports.deleteFeedback = async (req, res, next) => {
    await Feedback.findByIdAndDelete(req.params.id);
    req.flash('success', "Successfully deleted feedback.");
    res.redirect('/scripts');
}