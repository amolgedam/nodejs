require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');

const passport = require('passport');

const Emitter = require('events');

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

/* Event Emitter */
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

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
    res.locals.user = req.user;
    next();
});

/* Set Template engine */
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
app.use(expressLayout);

/* Routes */
require('./routes/web.js')(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=>{
    console.log(`Server run on PORT ${PORT}`);
});

/* Socket */
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    /* Join client room it require unique from App.js */
    console.log(socket.id);

    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join', (orderId)=>{
        console.log(orderId);
        socket.join(orderId);

    });

});

eventEmitter.on('orderUpdated', (data)=>{
    // Room name and send to client
    io.to(`order_${data.id}`).emit('orderUpdated', data);
});

