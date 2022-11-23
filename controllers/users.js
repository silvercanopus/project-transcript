const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('../views/users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', `Welcome to Transcript, ${username}!`);
            res.redirect('/');
        })
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    const { returnTo } = req.query;
    res.render('../views/users/login', { returnTo });
}

module.exports.login = (req, res) => {
    const { username } = req.body;
    const redirectUrl = req.query.returnTo || '/';
    req.flash('success', `Welcome back, ${username}!`);
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', err.message);
            next(err);
        }
        else {
            req.flash('success', "Successfully logged out!");
            res.redirect('/');
        }
    })
}

module.exports.showUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)
        .populate('scripts')
        .populate({
            path: 'translations',
            populate: {
                path: 'script'
            }
        });
    if (!user) {
        req.flash('error', "Cannot find that user!");
        return res.redirect('/');
    }
    res.render('users/show', { user });
}