var express = require('express');
// var db = require('./DBHandler');
var router = require('./router');
var app = express();

function start() {
    'use strict';
    console.log("server starts");

    app.use("/", router);
    app.listen(3000);
}

exports.start = start;