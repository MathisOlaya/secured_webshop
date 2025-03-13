const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

//add certification file
const options = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};

const userRoute = require("./routes/User");
app.use("/user", userRoute);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//default page
app.get("/", (req, res) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.redirect("/login");
  }

  const decoded = jwt.decode(token);

  return res.redirect(`/user/${decoded.username}`);
});

//signup page
app.get("/signup", (req, res) => {
  //if user is already connected, redirect to main
  if (!req.cookies.jwt_token) {
    return res.render("signup/signup");
  }
  return res.redirect("/");
});

//login page (default)
app.get("/login", (req, res) => {
  //if user is already connected, redirect to main
  if (!req.cookies.jwt_token) {
    return res.render("login/login");
  }
  return res.redirect("/");
});

// Démarrage du serveur
https.createServer(options, app).listen(443, () => {
  console.log("Server running on port 443");
});
