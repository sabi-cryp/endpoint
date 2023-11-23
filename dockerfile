# Utiliser une image officielle de Node.js en tant qu'image de base
FROM node:14

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le code de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel votre application s'exécutera
EXPOSE 30001

# Commande pour exécuter votre application avec le nouveau port
CMD ["node", "index.js", "30001"]
