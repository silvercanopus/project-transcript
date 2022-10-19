const express = require('express');
const methodOverride = require('method-override'); 
const ejsMate = require('ejs-mate');
const path = require('path');

const app = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

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