var express = require('express');
var db = require('./DBHandler');
var app = express();

function start() {
    'use strict';
    app.get("/", function (req, res) {
        console.log('%s called', req.url);
        // db.handle_database(req, res);
    });
    app.get("/index.html", function (req, res) {
        console.log('%s called', req.url);
        res.sendFile(__dirname + '/index.html');
    });

    app.post("/users", function (req, res) {
        console.log('%s called', req.url);
        console.log(req);
        console.dir(req.body);
        // db.handle_database(req, res);
    });

    app.listen(3000);
}

exports.start = start;