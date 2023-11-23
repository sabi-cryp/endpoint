const express = require('express');
const app = express();
const port = 30001;  // Change the port to 30001

// Serve the index.html file at the /api endpoint
app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://10.10.204.7:${port}`);
});
