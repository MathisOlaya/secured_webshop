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

async function postSignUp(req, res) {
    const { username, password } = req.body;

    //hash password
    const hash_data = hash(password);

    const query =
        "INSERT INTO t_users (username, password_hash, salt) VALUES (?, ?, ?);";
    db.query(
        query,
        [username, hash_data.pswd, hash_data.salt],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erreur lors de la création de l'utilisateur",
                    error: err,
                });
            }
            //if signup is ok, generate new token
            const token = createJwtToken(username);
            res.cookie("jwt_token", token, {
                httpOnly: true, // Rendre le cookie inaccessible via JavaScript
                secure: true, // Met à true si tu utilises HTTPS
                maxAge: 3600000, // Durée de vie du cookie en millisecondes (1 heure ici)
            });
            return res.status(201).json({ message: "OK", ok: true });
        }
    );
}

async function postLogin(req, res) {
    const { username, password } = req.body;

    const query = "SELECT password_hash, salt FROM t_users WHERE username = ?;";

    db.query(query, [username], (err, resultat) => {
        if (err) {
            return res.status(500).json({
                message: "Echec lors de la récupération du mot de passe",
            });
        }

        if (resultat.length < 1) {
            return res.status(400).json({
                message: "Aucun utilisateur trouvé avec ce nom",
            });
        }

        const db_password_hash = resultat[0].password_hash;
        const salt = resultat[0].salt;

        if (!compareHash(password, db_password_hash, salt)) {
            return res.status(400).json({
                message: "Le mot de passe ne correspond pas",
            });
        }

        //ok and create and return jwt token
        const token = createJwtToken(username);
        res.cookie("jwt_token", token, {
            httpOnly: true, // Rendre le cookie inaccessible via JavaScript
            secure: true, // Met à true si tu utilises HTTPS
            maxAge: 3600000, // Durée de vie du cookie en millisecondes (1 heure ici)
        });
        return res.status(200).json({ message: "OK", ok: true, token: token });
    });
}
async function getUserData(req, res) {
    const { username } = req.body;

    if (!username) {
        return res.json({ message: "No token provided" });
    }

    const query = "SELECT * FROM T_USERS WHERE username = ?";
}

async function showHomePage(req, res) {
    const username = req.params.username;
    res.render("home/home", { username });
}

async function showProfilePage(req, res) {
    const username = req.params.username;
    res.render("profile/profile", { username });
}

function createJwtToken(data) {
    const secretKey = process.env.JWT_SECRET_KEY;

    const options = {
        expiresIn: "1h",
    };

    return (token = jwt.sign({ username: data }, secretKey, options));
}

function compareHash(usrPswd, dbPswd, salt) {
    const userPassword = usrPswd + salt;

    //hash userPassword
    let res = "";

    for (let letter = 0; letter < userPassword.length; letter++) {
        const asciiCode =
            Math.floor(((userPassword.charCodeAt(letter) % 54) * 6) / 2) % 256;
        res += String.fromCharCode(asciiCode);
    }

    //compare both hash
    if (res === dbPswd) {
        return true;
    }
    return false;
}

function hash(input) {
    const salt = generateRandomString(16);

    const valueToHash = input + salt;
    let pswd = "";

    for (let letter = 0; letter < valueToHash.length; letter++) {
        const asciiCode =
            Math.floor(((valueToHash.charCodeAt(letter) % 54) * 6) / 2) % 256;
        pswd += String.fromCharCode(asciiCode);
    }
    return { pswd, salt };
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

module.exports = {
    showHomePage,
    showProfilePage,
    postSignUp,
    postLogin,
    getUserData,
};
