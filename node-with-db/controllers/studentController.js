const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res)=>{
    res.render('student/form', {
        viewTitle: 'Create Student'
    })
});

router.post('/', (req, res)=>{
    if(req.params.id == ''){
        insertRecord(req, res);
    }
    else{
        updateRecord(req, res);
    }
});

function insertRecord(req, res){
    const student = new Student();
    student.fullname = req.body.fullname;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    
    student.save((err, doc)=>{
        if(!err){
            res.redirect('student/list');
        }
        else{
            console.log(`Error during student insert ${err}`);
        }
    })
}

function updateRecord(req, res){
    Student.findOneAndUpdate( {_id: req.params.id}, req.body, {new:true}, (err, doc)=>{
        if(!err){
            res.redirect('student/list');
        }
        else{
            console.log(`Error during student update ${err}`);
        }
    });
}

router.get('/list', (req, res)=>{
    Student.find((err, doc)=>{
        if(!err){
            res.render('student/list', {
                list: doc
            });
        }
        else{
            console.log(`Error during student list ${err}`);
        }
    });
});

router.get('/:id', (req, res)=>{
    Student.find(req.params.id, (err, doc)=>{
        if(!err){
            
            console.log(doc);

            res.render('student/form', {
                student: doc,
                viewTitle: 'Update Student'
            });
        }
    });
});

router.get('delete/:id', (req, res)=>{
    Student.findByIdAndDelete(req.params.id, (err, doc)=>{
        if(!err){
            res.redirect('student/list');
        }
        else{
            console.log(`Error during student delete ${err}`);
        }
    })
});

module.exports = router;