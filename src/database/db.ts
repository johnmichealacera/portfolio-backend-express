import mysql from 'mysql';

export const dbConnection = async (host: string, user: string, password: string, database: string) => mysql.createConnection({
  host,
  user,
  password,
  database,
});

export default class DbConnection {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  };
  connection: any;
}