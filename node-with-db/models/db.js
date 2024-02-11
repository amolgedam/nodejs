const mongoose = require('mongoose');

/* mongoose.connect('mongodb://localhost:27017/studentDb', {
    useNewUrlParser: true
},
err =>{
    if(err){
        console.log(`Mongoose connection issue, ${err}`);
    }
    else{
        console.log(`Mongoose connected successfully`);
    }
}) */

mongoose.connect('mongodb://127.0.0.1:27017/studentDb')
  .then(() => console.log('Connected!'));

require('./student.model')