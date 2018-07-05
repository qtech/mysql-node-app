const express = require('express');
const app = express();
const mysql = require('mysql');
const Q = require('q');
const nsmarty = require('nsmarty');
//Everything related to Express
//Set view Engine 
// app.set('view engine','ejs');
nsmarty.tpl_path = __dirname + '/views/';

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
function getUsers(){
    var deferred = Q.defer();
    conn.query('SELECT * FROM users',deferred.makeNodeResolver());        
    return deferred.promise;
}

function getCategories(){
    var deferred = Q.defer();
    conn.query('SELECT * FROM categories',deferred.makeNodeResolver());
    return deferred.promise;
}

//Application Routing
app.get('/',(req,res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');                 
    Q.all([getUsers(),getCategories()])
    .then((results) => {
        $arr = {
            results:results[0][0]
        }        
        stream = nsmarty.assign('index.tpl',$arr);
        stream.pipe(res);
        //res.render('index.tpl',{data:results});
    })
    .catch((err) => {
        stream = nsmarty.assign('error.tpl');
        stream.pipe(res);        
    });        
});

//Starting the server on port 4000
app.listen(4000,(err) => {
    if(err) throw err;    
});