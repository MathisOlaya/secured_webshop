const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

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
  res.send("Bienvenu(e) " + req.params.username);
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

async function postLogin(req, res) {
  const { username, password } = req.body;

  const query = "SELECT password_hash FROM t_users WHERE username = ?;";

  db.query(query, [username], (err, resultat) => {
    if (err) {
      return res.status(500).json({
        message: "Echec lors de la récupération du mot de passe",
        error: err,
      });
    }

    if (resultat.length < 1) {
      return res.status(400).json({
        message: "Aucun utilisateur trouvé avec ce nom",
      });
    }

    const db_password_hash = resultat[0].password_hash;

    if (password !== db_password_hash) {
      return res.status(400).json({
        message: "Le mot de passe ne correspond pas",
        error: err,
      });
    }

    //ok and create and return jwt token
    const token = createJwtToken(username);
    return res.status(200).json({ message: "OK", ok: true, token: token });
  });
}

function createJwtToken(data) {
  const secretKey = process.env.JWT_SECRET_KEY;

  const options = {
    "expiresIn": "1h",
  };

  return (token = jwt.sign({ data }, secretKey, options));
}

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let value = "";

  for (let i = 0; i < length; i++) {
    const randomLetter =
      characters[Math.floor(Math.random() * characters.length)];
    value += randomLetter;
  }
  return value;
}

module.exports = { getSignUp, postSignUp, postLogin };
