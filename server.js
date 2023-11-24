// server.js
const express = require('express');
const app = express();
const port = 30001;

// Exemple de données (simulant une base de données)
const clients = [
  { id: 1, name: 'Client1', email: 'client1@example.com' },
  { id: 2, name: 'Client2', email: 'client2@example.com' },
  // Ajoutez d'autres clients au besoin
];

app.get('/client/:clientName', (req, res) => {
  const clientName = req.params.clientName;

  // Recherche du client par nom
  const client = clients.find(c => c.name === clientName);

  if (client) {
    // Si le client est trouvé, renvoie ses informations
    res.json({
      id: client.id,
      name: client.name,
      email: client.email
    });
  } else {
    // Si le client n'est pas trouvé, renvoie une réponse appropriée
    res.status(404).json({ error: 'Client non trouvé' });
  }
});

app.listen(port, () => {
  console.log(`Le service web est en écoute sur le port ${port}`);
});
