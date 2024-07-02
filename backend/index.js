const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes'); // Ensure the path is correct

const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Use the auth routes for any requests that start with /api/auth
app.use('/api/auth', authRoutes);

// Test route to check if the server is running
app.get('/api/test', (req, res) => {
    res.status(200).send('GET request successful');
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
