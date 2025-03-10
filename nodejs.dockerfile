FROM node:20

# Installer nodemon globalement
RUN npm install -g nodemon

# Définir le répertoire de travail
WORKDIR /home/node/app

# Copier le fichier package.json et installer les dépendances
COPY app/package.json ./
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY ./app/ ./

# Installer les dépendances avec npm ci
RUN npm ci

# Exposer le port
EXPOSE 443

# Démarrer l'application avec nodemon
CMD ["nodemon", "server.js"]
