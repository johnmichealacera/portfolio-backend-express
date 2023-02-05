const mysql = require('mysql');

const connection = async (host, user, password, database) => mysql.createConnection({
  host,
  user,
  password,
  database,
});

module.exports = connection;