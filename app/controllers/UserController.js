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

async function getSignUp(req, res) {
  res.send("User: Sarah Test");
}

async function postSignUp(req, res) {
  const { username, password } = req.body;

  const query = "INSERT INTO t_users (username, password_hash) VALUES (?, ?);";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
        error: err,
      });
    }
    return res.status(201).json({ message: "OK" });
  });
}

module.exports = { getSignUp, postSignUp };
