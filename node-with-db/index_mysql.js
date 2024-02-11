const express = require('express');
const mysql = require('mysql');

/* DB Connection */
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'node_mysql',
});

db.connect((err)=>{
    if(err){
        throw err
    }
    console.log('DB Connected');
});


const app = express();


// Create DB
app.get('/create-db', (req, res)=>{
    let sql = 'CREATE DATABASE node_mysql';
    db.query(sql, (err)=>{
        if(err){
            throw err;
        }
        res.send("DATABASE CREATED");
    })
});

/* Create Table */
app.get('/create-emp', (req, res)=>{
    let sql = "CREATE TABLE employees(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err)=>{
        if(err){
            throw err;
        }
        res.send("Tabel CREATED")
    })
});

/* Create Table */
app.get('/add-emp', (req, res)=>{
    let post = {name:"EMP One", designation: "CEO"};
    let sql = "INSERT INTO employees SET ?";
    db.query(sql, post, (err)=>{
        if(err){
            throw err;
        }
        res.send("Employee Added");
    })
});

/* SELECT */
app.get('/emp', (req, res)=>{
    let sql = "SELECT * FROM employees";
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        res.json(result);
    })
});

/* UPDATE */
app.get('/emp/:id', (req, res)=>{
    let name="EMP One Update";
    let sql = `UPDATE employees SET name='${name}' WHERE id=${req.params.id}`;
    db.query(sql, (err)=>{
        if(err){
            throw err;
        }
        res.send("Employee Updated");
    })
});

/* DELETE */
app.get('/delete-emp/:id', (req, res)=>{
    let sql = `DELETE FROM employees WHERE id=${req.params.id}`;
    db.query(sql, (err)=>{
        if(err){
            throw err;
        }
        res.send("Employee Deleted");
    })
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server run on port ${PORT}`);
})

