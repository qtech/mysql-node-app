const express = require('express');
const app = express();
const mysql = require('mysql');
const Q = require('q');

//Everything related to Express
//Set view Engine 
app.set('view engine','ejs');


//Everything related to Mysql or Database
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


//Everything Promises
let deferred = Q.defer();

function getUsers(){
    conn.query('SELECT * FROM users LIMIT 1',deferred.makeNodeResolver());        
    return deferred.promise;
}

function getCategories(){
    conn.query('SELECT * FROM categories LIMIT 1',deferred.makeNodeResolver());
    return deferred.promise;
}

//Application Routing
app.get('/',(req,res) => {                 
    Q.all([getUsers(),getCategories()])
    .then((results) => {
        console.log(results);
        res.end('Finished Query');
        // res.render('index',{data:results});
    })
    .catch((err) => {
        res.render('error',{data:err});
    });        
});

//Starting the server on port 4000
app.listen(4000,(err) => {
    if(err) throw err;    
});