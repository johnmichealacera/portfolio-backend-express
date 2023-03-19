import mysql from 'mysql2/promise';

export const createPool = () => {
  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

export default class DbConnection {
  pool: any;

  constructor() {
    this.pool = createPool();
  }

  async query(sql: string, values?: any) {
    const [rows] = await this.pool.query(sql, values);
    return rows;
  }
}