// index.js
const express = require('express');
const app = express();
const port = 30001;

// Définition d'une route pour l'endpoint /api/hello
app.get('/api/hello', (req, res) => {
    // Réponse JSON pour l'endpoint /api/hello
    res.json({ message: 'Bonjour, le monde!' });
});

// Écoute sur le port spécifié (dans cet exemple, 3000)
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
