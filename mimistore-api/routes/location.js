const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all locations
router.get('/', (req, res) => {
    const sql = `SELECT * FROM Location`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get locations by user ID
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query(
        `SELECT * FROM Location WHERE UserId = ?`,
        [userId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
});

// Create new location
router.post('/', (req, res) => {
    const {
        UserId,
        Title,
        Hot,
        Duureg,
        Horoo,
        Detail,
        isAnotherPerson,
        f_name,
        l_name,
        phone_number,
    } = req.body;

    const sql = `
        INSERT INTO Location 
        (UserId, Title, Hot, Duureg, Horoo, Detail, isAnotherPerson, f_name, l_name, phone_number) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            UserId,
            Title,
            Hot,
            Duureg,
            Horoo,
            Detail,
            isAnotherPerson,
            f_name,
            l_name,
            phone_number,
        ],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ LocationId: result.insertId });
        }
    );
});

// Update a location by ID
router.put('/:id', (req, res) => {
    const LocationID = req.params.id;

    const {
        UserId,
        Title,
        Hot,
        Duureg,
        Horoo,
        Detail,
        isAnotherPerson,
        f_name,
        l_name,
        phone_number,
    } = req.body;

    const sql = `
        UPDATE Location
        SET UserId = ?, Title = ?, Hot = ?, Duureg = ?, Horoo = ?, Detail = ?,
            isAnotherPerson = ?, f_name = ?, l_name = ?, phone_number = ?
        WHERE LocationId = ?
    `;

    db.query(
        sql,
        [
            UserId,
            Title,
            Hot,
            Duureg,
            Horoo,
            Detail,
            isAnotherPerson,
            f_name,
            l_name,
            phone_number,
            LocationID,
        ],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true, affectedRows: result.affectedRows });
        }
    );
});

// Delete a location by ID
router.delete('/:id', (req, res) => {
    const LocationID = req.params.id;
    db.query(
        `DELETE FROM Location WHERE LocationId = ?`,
        [LocationID],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true });
        }
    );
});

module.exports = router;
