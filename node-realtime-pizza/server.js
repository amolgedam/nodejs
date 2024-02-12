const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');


/* DB Connections */
const mongoURI = 'mongodb+srv://amolgedam1994:22H3e67bG7MVUmMI@mernbookingapp.stvtb3m.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});



/* mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});
const connection = mongoose.connection;
connection.then(()=>{
    console.log('Database connections...');
}).catch(err=>{
    console.log('Unable to connect Database', err);
}) */




const path = require('path');

const app = express();

/* CSS Assets */
app.use(express.static('public'));

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
