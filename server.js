const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 30001;
const mysqlConfig = {
  host: 'db', // Update with your MySQL host
  user: 'sabrine_username', // Update with your MySQL username
  password: 'sabrine_password', // Update with your MySQL password
  database: 'mydatabase',
};

// MySQL connection pool
const pool = mysql.createPool(mysqlConfig);

// Create a "clients" table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
  )
`;

pool.query(createTableQuery, (error, results, fields) => {
  if (error) {
    console.error('Error creating table:', error);
  } else {
    console.log('Table "clients" created or already exists');
  }
});

// Add clients to the "clients" table
const insertClientsQuery = `
  INSERT INTO clients (id, name, email) VALUES
  (1, 'Sabrine', 'sabrine@example.com'),
  (2, 'Aymen', 'aymen@example.com'),
  (3, 'Mehdi', 'mehdi@example.com')
`;

pool.query(insertClientsQuery, (error, results, fields) => {
  if (error) {
    console.error('Error adding clients:', error);
  } else {
    console.log('Clients added to the table');
  }

  // Close the MySQL connection pool after adding clients
  pool.end();
});

app.get('/client/:clientName', (req, res) => {
  const clientName = req.params.clientName;

  // Find the client in the "clients" table
  const selectClientQuery = 'SELECT * FROM clients WHERE name = ?';

  pool.query(selectClientQuery, [clientName], (error, results, fields) => {
    if (error) {
      console.error('Error querying client:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length > 0) {
      const clientData = results[0];
      const dynamicEndpoint = `http://10.10.204.7:30001/client/${clientData.name}`;

      res.json({
        id: clientData.id,
        name: clientData.name,
        email: clientData.email,
        dynamicEndpoint: dynamicEndpoint,
      });
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Le service web est en écoute sur le port ${port}`);
});
