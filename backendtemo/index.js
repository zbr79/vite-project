// index.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
