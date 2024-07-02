const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('Server error');
            }
            res.status(200).send('User registered successfully');
        });
    } catch (error) {
        console.error('Error in /register route:', error);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) {
                console.error('Error querying user:', err);
                return res.status(500).send('Server error');
            }
            if (results.length === 0) return res.status(404).send('User not found');

            const user = results[0];
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send('Invalid password');
            }

            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
            res.status(200).send({ auth: true, token });
        });
    } catch (error) {
        console.error('Error in /login route:', error);
        res.status(500).send('Server error');
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send('No token provided');

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.error('Failed to authenticate token:', err);
            return res.status(500).send('Failed to authenticate token');
        }
        req.userId = decoded.id;
        next();
    });
};

// Protected route example
router.get('/me', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.userId], (err, results) => {
        if (err) {
            console.error('Error querying user by id:', err);
            return res.status(500).send('Server error');
        }
        if (results.length === 0) return res.status(404).send('User not found');

        res.status(200).send(results[0]);
    });
});

module.exports = router;
