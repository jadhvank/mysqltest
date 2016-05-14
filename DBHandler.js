var mysql = require('mysql');

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
            res.json({code: 100, status: "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from potluck", function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        if (req.url === '/users') {
            var user = {
                'userid': req.body.userid,
                'name': req.body.name,
                'address': req.body.address
            };

            connection.query("insert into users set ?", user, function (err, result) {
                if (err) {
                    console.error(err);
                    throw err;
                }
                console.log(result);
                res.send(200, 'success');
            });
        }
        connection.on('error', function (err) {
            console.error(err);
            res.json({code: 100, status: "Error in connection database"});
            return;
        });
    });
}

exports.handle_database = handle_database;