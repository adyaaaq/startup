const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
// GET all users
router.get('/', (req, res) => {
    db.query(
        'SELECT UserId, Username, FirstName, LastName, PhoneNumber, Role FROM Users',
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
});

// GET single user
router.get('/:id', (req, res) => {
    db.query(
        'SELECT UserId, Username, FirstName, LastName, PhoneNumber, Role FROM Users WHERE UserId = ?',
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result[0]);
        }
    );
});

// CREATE new user (register)
router.post('/', async (req, res) => {
    const {
        Username,
        Password,
        FirstName,
        LastName,
        PhoneNumber,
        Role,
        BranchId,
    } = req.body;
    const hashed = await bcrypt.hash(Password, 10);

    db.query(
        'INSERT INTO Users (Username, Password, FirstName, LastName, PhoneNumber, Role, BranchId) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Username, hashed, FirstName, LastName, PhoneNumber, Role, BranchId],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: result.insertId });
        }
    );
});

// LOGIN (basic)
router.post('/login', (req, res) => {
    const { Username, Password } = req.body;
    db.query(
        'SELECT * FROM Users WHERE Username = ?',
        [Username],
        async (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0)
                return res.status(401).json({ message: 'User not found' });

            const user = results[0];
            const valid = await bcrypt.compare(Password, user.Password);
            if (!valid)
                return res.status(401).json({ message: 'Invalid password' });

            res.json({
                id: user.UserId,
                username: user.Username,
                role: user.Role,
                message: 'Login successful',
            });
        }
    );
});

// UPDATE user
router.put('/:id', (req, res) => {
    const { FirstName, LastName, PhoneNumber, Role, BranchId } = req.body;
    db.query(
        'UPDATE Users SET FirstName=?, LastName=?, PhoneNumber=?, Role=?, BranchId=? WHERE UserId=?',
        [FirstName, LastName, PhoneNumber, Role, BranchId, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true });
        }
    );
});

// DELETE user
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Users WHERE UserId = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true });
    });
});

module.exports = router;
