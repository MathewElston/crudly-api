import mysql from "mysql2/promise";
const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "super",
  password: "super",
  database: "crudlyapi",
});
export default db;
