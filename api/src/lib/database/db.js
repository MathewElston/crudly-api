import mysql from "mysql2/promise";
const db = mysql.createPool({
  host: "mysql-server",
  port: 3306,
  user: "super",
  password: "super",
  database: "crudlyapi",
});
export default db;
