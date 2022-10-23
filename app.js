const express = require('express');
const methodOverride = require('method-override'); 
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/AppError');

const userRoutes = require('./routes/users');

const User = require('./models/user');

const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongo');
const dbUrl = 'mongodb://localhost:27017/transcript';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database Connected!");
})

const app = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const secret = 'ThisShouldBeABetterSecret';

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
})

store.on('error', function (e) {
    console.log("Session Store Error", e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
        maxAge: 1 * 24 * 60 * 60 * 1000
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/scripts', (req, res) => {
    res.render('scripts/index');
})

app.get('/scripts/new', (req, res) => {
    res.render('scripts/new');
})

app.use('/', userRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oops, something went wrong";
    res.status(statusCode).render('error', { err });
})