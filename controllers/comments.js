const Comment = require('../models/comment');
const Script = require('../models/script');

module.exports.createComment = async (req, res, next) => {
    const script = await Script.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    script.comments.push(comment);
    await comment.save();
    await script.save();
    res.redirect(`/scripts/${script._id}`);
}

module.exports.deleteComment = async (req, res, next) => {
    const { id, commentId } = req.params;
    await Script.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/scripts/${id}`);
}