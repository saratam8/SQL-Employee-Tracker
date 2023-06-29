const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "NeedNewJob13",
    database: "business_db"
  });
  
module.exports = connection;