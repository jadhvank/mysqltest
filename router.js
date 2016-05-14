var express = require('express');
var bodyParser = require('body-parser');
var db = require('./DBHandler');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get("/", function (req, res) {
    'use strict';
    console.log('%s called', req.url);
    // db.handle_database(req, res);
});
router.get("/index.html", function (req, res) {
    'use strict';
    console.log('%s called', req.url);
    res.sendFile(__dirname + '/index.html');
});

router.post("/users", function (req, res) {
    'use strict';
    console.log('%s called', req.url);
    console.dir(req.body);
    db.handle_database(req, res);
    res.send("POST success");
});


module.exports = router;