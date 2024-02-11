require('./models/db');

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const studentController = require('./controllers/studentController');

app.get('/', (req, res)=>{
    res.send('<h3>Welcome to Student Database</h3><h4>Click here to access <a href="/student/list">Student</a> Records</h4>');
});

app.set('views', path.join(__dirname, '/views/'));

app.engine('.hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: '.hbs',
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "views/layouts/"
}));

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server run on post ${PORT}`);
});

app.use('student', studentController);

