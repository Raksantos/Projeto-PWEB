var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'duo',
    port: 3306,
    debug: false,
    multipleStatements: true
});

module.exports.connection = connection;