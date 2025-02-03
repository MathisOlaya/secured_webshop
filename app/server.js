const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

//add certification file
const options = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.crt"),
};

const userRoute = require("./routes/User");
app.use("/user", userRoute);

app.use(express.static(path.join(__dirname, "public")));

//default page
app.get("/", (req, res) => {
  res.redirect("/login");
});

//signup page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup", "signup.html"));
});

//login page (default)
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login", "login.html"));
});

// Démarrage du serveur
https.createServer(options, app).listen(443, () => {
  console.log("Server running on port 443");
});
