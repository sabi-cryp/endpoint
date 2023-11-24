const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 30001;
const mongoURL = 'mongodb://mongo:30008'; // Use the container name "mongo" as the hostname and the host port
const dbName = 'mydatabase';

// Mongoose model for the "clients" collection
const Client = mongoose.model('Client', {
  id: Number,
  name: String,
  email: String,
});

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Add clients to the "clients" collection
const sabrine = new Client({ id: 1, name: 'Sabrine', email: 'sabrine@example.com' });
const aymen = new Client({ id: 2, name: 'Aymen', email: 'aymen@example.com' });
const jan = new Client({ id: 3, name: 'mehdi', email: 'mehdi@example.com' });

// Save clients to the database
Promise.all([sabrine.save(), aymen.save(), jan.save()])
  .then(() => {
    console.log('Clients added to the database');
  })
  .catch((error) => {
    console.error('Error adding clients:', error);
  })
  .finally(() => {
    // Disconnect from MongoDB after adding clients
    mongoose.connection.close();
  });

app.get('/client/:clientName', async (req, res) => {
  const clientName = req.params.clientName;

  try {
    // Find the client in the database
    const clientData = await Client.findOne({ name: clientName });

    if (clientData) {
      // Generate the dynamic endpoint based on the client's name
      const dynamicEndpoint = `http://10.10.204.7:30001/client/${clientData.name}`;

      // Include the dynamic endpoint in the response
      res.json({
        id: clientData.id,
        name: clientData.name,
        email: clientData.email,
        dynamicEndpoint: dynamicEndpoint,
      });
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Le service web est en écoute sur le port ${port}`);
});
