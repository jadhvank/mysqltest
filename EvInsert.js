var express = require('express');
var mysql = require('mysql');
var app = express();

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'dblab3410',
    database: 'test',
    debug: false
});

function handle_database(req, res) {
    'use strict';
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from potluck", function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}


app.get("/", function (req, res) {
    'use strict';
    handle_database(req, res);
});

app.listen(3000);