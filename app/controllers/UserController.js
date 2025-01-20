const mysql = require("mysql2");

//create connection with db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_secured_webshop",
  port: 6033,
});

//try to connect
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:");
    return;
  }
});

module.exports = {
  get: (req, res) => {
    res.send("User: Sarah Test");
  },
  post: (req, res) => {
    db.query("INSERT INTO t_users (username) VALUES ('TEST')");
  },
};
