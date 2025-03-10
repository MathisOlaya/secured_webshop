# 📌 Projet Secured WebShop

## 🛑 Requis
 - GitBash
 - Docker

Ce repository est utilisé dans le cadre du projet Secure Webshop pour le cours 183 - Sécurité des applications
## 🚀 Fonctionnalités
- 🛒 Site WEB E-commerce
- 🔐 Authentification avec token JWT 
- ✔ Page administrateur  
- 🧔 Page Profile
  
## 🔧 Configuration avec Dockerisation
Pour lancer ce projet, il est nécessaire d'effectuer quelques opérations.

1) Installer le ZIP du projet et le décompresser
2) Ouvrir le dossier /app et cloner le fichier .env.example et le renommer en .env
3) Ajouter les valeurs qu'on y souhaite (laisser root/root pour le login de la db et ne pas changer le PORT!)
4) Encore dans /app créer un dossier certs si non existant
5) Et exécuter ces commandes dans bash dans le dossier creds
   ```bash
    openssl genrsa -out key.pem 2048
 
    openssl req -new -key key.pem -out csr.pem
   
    openssl x509 -req -days 730 -in csr.pem -signkey key.pem -out cert.pem
   ```
6) Puis renommer cert.pem en cert.crt
7) Ouvrir un CMD dans le dossier globale du projet
8) Exécuter la commande :
   ```bash
   docker-compose up -d
   ```
9) N'oubliez pas de lancer les conteneurs après.
10) 🛑 Si une erreur de connexion se produit, relancer les conteneurs
11) Charger le base de donnée grâce à cette commande 🛑 ATTENTION : Si vous avez changé le nom de la DB dans les variables d'environements, change le ICI :
   ```bash
   docker exec -i db_container mysql -u root -proot db_secured_webshop < ./db/db_secured_webshop.sql
   ```
12) Se rendre sur :
    ```url
    https://localhost
    ```
14) Créer un utilisateur ou se connecter avec l'admin avec ces informations :
   ```json
   {
      "username": "zraidex",
      "password": "onglier"
   }
   ```
14) Pour avoir un admin, il faut changer manuellement dans la base de données

## 🛠️ Configuration sans Dockerisation
1) Si la dockerisation ne fonctionne pas (1 chance sur 2) suiver ces étapes
2) Cloner le projet
3) Mettre à jour les variables d'environnemts à partir du .example dans le dossier /app
4) Générer les certs comme décris ci-dessus
5) Se rendre dans la racine du dossier du projet et exécuter
   ```bash
   docker-compose up -d
   ```
6) Ne tenez pas compte des erreurs qui peuvent subvenir car celles-ci proviennent de la dockerisation
7) Se render dans app/controllers/userController.mjs et changer les ligne :
   ```javascript
    const db = mysql.createConnection({
     host: "db",
     user: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     port: process.env.DB_PORT,
   });
   ```
   EN ⏭️
   ```javascript
    const db = mysql.createConnection({
     host: "localhost",
     user: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     port: process.env.DB_PORT,
   });
8) Se rendre dans /app et ouvrir un CMD et exécuter ces commandes :
   ```bash
   npm i
   npm start
   ```

## 📃 Page de démarrage
```url
https://localhost
```
