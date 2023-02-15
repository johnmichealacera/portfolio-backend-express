const mysql = require('mysql');

export const dbConnection = async (host: string, user: string, password: string, database: string) => mysql.createConnection({
  host,
  user,
  password,
  database,
});