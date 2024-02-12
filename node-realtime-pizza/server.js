const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');

const path = require('path');

const app = express();

/* CSS Assets */
app.use(express.static('public'));

/* Set Template engine */
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
app.use(expressLayout);

/* Routes */
app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/cart', (req, res)=>{
    res.render("customers/cart");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server run on PORT ${PORT}`);
})
