var mysql = require('mysql');

var createConnection =  mysql.connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'bearnies',
        password: 'khanghi1',
        database: 'btcn06web'
});

createConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});
