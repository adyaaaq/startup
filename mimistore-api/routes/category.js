const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all categories
router.get('/', (req, res) => {
    const { type } = req.query;

    // Start query and parameters
    let query = 'SELECT * FROM Categories';
    const params = [];

    // Add WHERE clause if type is provided
    if (type) {
        query += ' WHERE Type = ?';
        params.push(type);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).send(err);

        const fixed = results.map((c) => ({
            CategoryId: Number(c.CategoryId),
            CategoryName: c.CategoryName,
            Type: c.Type,
        }));

        res.json(fixed);
    });
});

// GET category by ID
router.get('/:id', (req, res) => {
    db.query(
        'SELECT * FROM Categories WHERE CategoryId = ?',
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    );
});

// POST create new category
router.post('/', (req, res) => {
    const { CategoryName, Type } = req.body;

    db.query(
        'INSERT INTO Categories (CategoryName, Type) VALUES (?, ?)',
        [CategoryName, Type],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: result.insertId });
        }
    );
});

// PUT update category
router.put('/:id', (req, res) => {
    const { CategoryName, Type } = req.body;

    db.query(
        'UPDATE Categories SET CategoryName = ?, Type = ? WHERE CategoryId = ?',
        [CategoryName, Type, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true });
        }
    );
});

// DELETE category
router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM Categories WHERE CategoryId = ?',
        [req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true });
        }
    );
});

module.exports = router;
