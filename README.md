# 📌 Projet Secured WebShop

Ce repository est utilisé dans le cadre du projet Secure Webshop pour le cours 183 - Sécurité des applications
## 🚀 Fonctionnalités
- 🛒 Site WEB E-commerce
- 🔐 Authentification avec token JWT 
- ✔ Page administrateur  
- 🧔 Page Profile
  
## 🔧 Configuration
Pour lancer ce projet, il est nécessaire d'effectuer quelques opérations.

1) Installer le ZIP du projet et le décompresser
2) Ouvrir un CMD dans le dossier du projet
3) Exécuter la commande :
   ```bash
   docker-compose up -d
   ```
4) N'oubliez pas de lancer les conteneurs après.
5) Charger le base de donnée grâce à cette commande :
   ```bash
   docker exec -i db_container mysql -u root -proot < ./db/db_secured_webshop.sql
   ```
6) Se rendre dans le dossier app
7) Dupliquer le fichier .env.example et le renommer en .env
8) Ouvrir le fichier .env, et y rentrer une clé secrète aléatoire dans 'JWT_SECRET_KEY'
9) Facultatif : Vous pouvez également choisir l'utilisation de BCRYPT ou pas.
10) Ouvrir un cmd dans le dossier actuel (app)
11) Lancer le serveur avec la commande :
   ```bash
   npm start
   ```
12) Créer un utilisateur ou connecté vous avec l'administrateur :
   ```json
   {
      "username": "zraidex",
      "password": "onglier"
   }
   ```

## 📃 Page de démarrage
```url
https://localhost
```
