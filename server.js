const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 30001;

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// GET endpoint
app.get('/client/:nom_client', (req, res) => {
    const nomClient = req.params.nom_client;
    res.send(`Endpoint for ${nomClient}: /api`);
});

// POST endpoint
app.post('/custom', (req, res) => {
    const nomClient = req.body.nom_client;
    res.send(`Custom functionality for ${nomClient}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://10.10.204.7:${port}`);
});
