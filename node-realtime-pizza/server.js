require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');

const passport = require('passport');

/* DB Connections */
const mongoURI = process.env.MONGO_DB_URL;

const connection = mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const path = require('path');

const app = express();

/* Session Store => sessioon store in DB else store in Memory */
let mongoStoreOption = {
    mongoUrl: mongoURI,
    collection: 'sessions'
};

/* Session config */
app.use(session({
    secret: process.env.COOKIES_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create(mongoStoreOption),
    cookie: {maxAge: 1000 * 60 * 60 * 24} // 24 H
    // cookie: {maxAge: 1000 * 15} // 15 sec 
}));
app.use(flash());

/* Passport config */
const passportInit = require('./app/config/passport.js');
passportInit(passport);

app.use(passport.initialize());
app.use(passport.session());

/* Assets */
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Global Middleware */
app.use((req, res, next)=>{
    /* Set session on local */
    res.locals.session = req.session;
    next();
});

/* Set Template engine */
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
app.use(expressLayout);

/* Routes */
require('./routes/web.js')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server run on PORT ${PORT}`);
})
