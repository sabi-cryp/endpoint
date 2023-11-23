const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 30001;

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Map of clients to specific logic
const clientLogicMap = {
    client1: 'Logic for client1',
    client2: 'Logic for client2',
    client3: 'Logic for client3',
};

// GET endpoint
app.get('/client/:nom_client', (req, res) => {
    const nomClient = req.params.nom_client;

    // Check if the client has specific logic
    if (clientLogicMap[nomClient]) {
        res.send(`Endpoint for ${nomClient}: ${clientLogicMap[nomClient]}`);
    } else {
        res.status(404).send(`Client ${nomClient} not found`);
    }
});

// POST endpoint
app.post('/custom', (req, res) => {
    const nomClient = req.body.nom_client;

    // Check if the client has specific logic
    if (clientLogicMap[nomClient]) {
        res.send(`Custom functionality for ${nomClient}: ${clientLogicMap[nomClient]}`);
    } else {
        res.status(404).send(`Client ${nomClient} not found`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
