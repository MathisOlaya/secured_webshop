const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

function verifyToken(req, res, next) {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Invalid or expired token" });
        }

        //Vérifier que c'est la bonne personne
        if (decoded.username !== req.params.username) {
            return res
                .status(403)
                .json({ message: "Accès refusé. Utilisateur non autorisé." });
        }

        next();
    });
}

function checkAdminStatus(req, res, next) {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(403).json({ message: "No token provided." });
    }

    const decoded = jwt.decode(token);

    if (decoded.role !== "admin") {
        return res.status(400).json({
            message: "Vous n'êtes pas admin. Impossible d'accéder à la page",
        });
    }

    next();
}

module.exports = { verifyToken, checkAdminStatus };
