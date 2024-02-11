const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: 'This field is required'
    },
    email:{
        type: String,
        require: 'This field is required'
    },
    mobile:{
        type: Number,
        require: 'This field is required'
    },
    city:{
        type: String,
        require: 'This field is required'
    },
});

mongoose.model('Student', studentSchema);