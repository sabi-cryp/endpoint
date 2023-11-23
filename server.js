const express = require('express');
const app = express();
const port = 30001;

// List of clients
const clients = ['client1', 'client2', 'client3'];

// Serve the index.html file at the root endpoint
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Serve an endpoint based on the client name in the URL
app.get('/:nom_client', (req, res) => {
    const nomClient = req.params.nom_client;

    // Check if the client exists in the list
    if (clients.includes(nomClient)) {
        // Generate an endpoint based on the client name
        const endpoint = `/${nomClient}/api`;

        // Send a response with the generated endpoint
        res.send(`Endpoint for ${nomClient}: ${endpoint}`);
    } else {
        // If the client is not in the list, send an error response
        res.status(404).send(`Client ${nomClient} not found`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://10.10.204.7:${port}`);
});
