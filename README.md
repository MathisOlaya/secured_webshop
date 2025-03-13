# 📌 Projet Secured WebShop

Ce repository est utilisé dans le cadre du projet Secure Webshop pour le cours 183 - Sécurité des applications

## 🚀 Fonctionnalités

- 🛒 Site WEB E-commerce
- 🔐 Authentification avec token JWT
- ✔ Page administrateur
- 🧔 Page Profile

## 🪛 Prérequis

- GitBash
- Docker

## 🔧 Configuration

Pour lancer ce projet, il est nécessaire d'effectuer quelques opérations.

1. Cloner ce projet en local
   ```bash
   git clone https://github.com/MathisOlaya/secured_webshop
   ```
2. Ouvrer le projet à la racine et ouvrer un GIT BASH
3. Exécuter ces commandes suivantes :
   ```bash
   cd app
   ```
4. Puis pour installer les certifications

   ```bash
   mkdir certs
   ```
   
   ```bash
   cd certs
   ```
   
   ```bash
   openssl genrsa -out key.pem 2048
   ```

   ```bash
   openssl req -new -key key.pem -out csr.pem
   ```

   ```bash
   openssl x509 -req -days 730 -in csr.pem -signkey key.pem -out cert.pem
   ```

5. Puis rendez-vous dans le dossier app (pas depuis le CMD) et copier le fichier .env.example et renommer le en .env
6. Changer les variables d'environnement à votre guise 🛑 Sauf les variables DB_PORT & DB_USERNAME & DB_PASSWORD (qui doivent être égale à root root par défaut)
   A noter que la variable 'USING_BCRYPT' permet de définir au site s'il faut enregistrer ses utilisateurs avec la librairie bcrypt.
7. Revenir à la racine du projet et y lancer un CMD, puis exécuter :
   ```bash
   docker-compose up -d
   ```
8. Une fois le docker installé et lancé, toujours dans le CMD à la racine, effectuer ces commandes :
   ```bash
   cd app
   ```
   ```bash
   npm i
   ```
   ```bash
   npm start
   ```
9. Fini !🟢 Vous pouvez maintenant créer un compte ou se connecter avec le compte administrateur :
   ```javascript
   "username": "zraidex",
   "password": "ongliade",
   ```

## 📃 Page de démarrage

```url
https://localhost
```
