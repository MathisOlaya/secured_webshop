const express = require("express");
const https = require("https");
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2')

const app = express();

//add certification file
const options = {
    key: fs.readFileSync('certs/key.pem'),
    cert: fs.readFileSync('certs/cert.crt')
}

//create connection with db
// mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'db_secured_webshop',
//     port: 6033
// });

//try to connect
// connection.connect((err) => {
//     if (err) {
//       console.error('Erreur de connexion à la base de données:');
//       return;
//     }
//   });

const userRoute = require('./routes/User');
app.use('/user', userRoute);

app.use(express.static(path.join(__dirname, 'public')));

//default page
app.get('/', (req, res) => {
    res.redirect('/login');
})

//signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup', 'signup.html'));
  });

//login page (default)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
  });

// Démarrage du serveur
https.createServer(options, app).listen(443, () => {
    console.log('Server running on port 443');
});