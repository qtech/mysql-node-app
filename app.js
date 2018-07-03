const express = require('express');
const app = express();
const mysql = require('mysql');

//Set database credentials.
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'milanus',
});

//Check if Database is connected or not. Throw err if not.
conn.connect((err) => {
    if(err) throw err;
    console.log('Database Connected');
});

//Set view Engine
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index');
});

app.listen(4000,(err) => {
    if(err) throw err;    
});