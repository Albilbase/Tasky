import mysql from "mysql2"

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"PASSWORD",
  database:"tasks_app"
})

export default db;