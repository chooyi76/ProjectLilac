const mysql = require("mysql");

const db = mysql.createConnection({
  host: "lilac.ct3v4cksscyk.ap-northeast-2.rds.amazonaws.com",
  user: "CHOO",
  password: "choo1234",
  database: "sekiro",
  port: 3306,
  dateStrings: "date",
  multipleStatements : true
});

db.connect();

module.exports = db;