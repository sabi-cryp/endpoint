const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 30001;
const mongoURL = 'mongodb://mongo:30008'; // Use the container name "mongo" as the hostname and the host port
const dbName = 'mydatabase';

// Simulated in-memory data
const clients = [
  { id: 1, name: 'Client1', email: 'client1@example.com' },
  { id: 2, name: 'Client2', email: 'client2@example.com' },
  // Add other clients as needed
];

app.get('/client/:clientName', async (req, res) => {
  const clientName = req.params.clientName;

  try {
    const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const clientsCollection = db.collection('clients');

    // Check if the client exists in the database
    const clientData = await clientsCollection.findOne({ name: clientName });

    if (clientData) {
      // Generate the dynamic endpoint based on the client's name
      const dynamicEndpoint = `http://10.10.204.7:30001/client/${clientData.name}`;

      // Include the dynamic endpoint in the response
      res.json({
        id: clientData.id,
        name: clientData.name,
        email: clientData.email,
        dynamicEndpoint: dynamicEndpoint
      });
    } else {
      // If client not found in the database, look in the simulated in-memory data
      const clientFromMemory = clients.find(c => c.name === clientName);

      if (clientFromMemory) {
        res.json({
          id: clientFromMemory.id,
          name: clientFromMemory.name,
          email: clientFromMemory.email,
          dynamicEndpoint: `http://10.10.204.7:30001/client/${clientFromMemory.name}`
        });
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Le service web est en écoute sur le port ${port}`);
});
