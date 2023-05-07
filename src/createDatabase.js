var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "desireeAPI",
    password: '123456'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE PokemonAPI", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});