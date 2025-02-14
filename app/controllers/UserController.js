const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

//create connection with db
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "db_secured_webshop",
    port: process.env.DB_PORT,
});

//try to connect
db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données: ", err);
        return;
    }
    console.log("Connection à la base de donnée réussie.");
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
        async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erreur lors de la création de l'utilisateur",
                    error: err,
                });
            }
            //get user data
            const user = await getUserDataFromUsername(username);

            //if signup is ok, generate new token
            const token = createJwtToken({
                username: user.username,
                role: user.role,
            });
            res.cookie("jwt_token", token, {
                httpOnly: true, // Rendre le cookie inaccessible via JavaScript
                secure: true, // Met à true si tu utilises HTTPS
                maxAge: 3600000, // Durée de vie du cookie en millisecondes (1 heure ici)
            });
            return res.status(201).json({ message: "OK", ok: true });
        }
    );
}

async function getUserDataFromUsername(username) {
    const query = "SELECT * FROM t_users WHERE username = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [username], (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            if (result.length === 0) {
                reject(new Error("Utilisateur non trouvé"));
                return;
            }

            resolve(result[0]);
        });
    });
}

async function postLogin(req, res) {
    const { username, password } = req.body;

    const query =
        "SELECT password_hash, salt, role FROM t_users WHERE username = ?;";

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
        const role = resultat[0].role;

        if (!compareHash(password, db_password_hash, salt)) {
            return res.status(400).json({
                message: "Le mot de passe ne correspond pas",
            });
        }

        //ok and create and return jwt token
        const token = createJwtToken({ username, role });
        res.cookie("jwt_token", token, {
            httpOnly: true, // Rendre le cookie inaccessible via JavaScript
            secure: true, // Met à true si tu utilises HTTPS
            maxAge: 3600000, // Durée de vie du cookie en millisecondes (1 heure ici)
        });
        return res.status(200).json({ message: "OK", ok: true, token: token });
    });
}

async function showHomePage(req, res) {
    const username = req.params.username;

    //decode token and get user's role
    const decoded = jwt.decode(req.cookies.jwt_token);

    res.render("home/home", { username, role: decoded.role });
}

async function showProfilePage(req, res) {
    const username = req.params.username;

    const user = await getUserDataFromUsername(username);

    res.render("profile/profile", {
        username,
        id: user.user_id,
        role: user.role,
        createdAt: user.created_at,
    });
}

async function showAdminPage(req, res) {
    res.render("admin/admin");
}

async function logOut(req, res) {
    res.clearCookie("jwt_token");
    res.json({ success: true });
}

function createJwtToken(data) {
    const secretKey = process.env.JWT_SECRET_KEY;

    const options = {
        expiresIn: "1h",
    };

    return (token = jwt.sign(data, secretKey, options));
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
    showAdminPage,
    postSignUp,
    postLogin,
    logOut,
};
