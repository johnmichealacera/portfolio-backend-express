const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12595958",
  password: "d5sQ7arb4R",
  database: "sql12595958",
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;