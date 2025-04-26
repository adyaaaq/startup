const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all branches
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Branch';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);

        const fixed = results.map((c) => ({
            BranchId: Number(c.BranchId),
            BranchName: c.BranchName,
        }));

        res.json(fixed);
    });
});

// GET branch by ID
router.get('/:id', (req, res) => {
    db.query(
        'SELECT * FROM Branch WHERE BranchId = ?',
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    );
});

// POST create new branch
router.post('/', (req, res) => {
    const { BranchName } = req.body;

    db.query(
        'INSERT INTO Branch (BranchName) VALUES (?)',
        [BranchName],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: result.insertId });
        }
    );
});

// PUT update branch
router.put('/:id', (req, res) => {
    const { BranchName } = req.body;

    db.query(
        'UPDATE Branch SET BranchName = ? WHERE BranchId = ?',
        [BranchName, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true });
        }
    );
});

// DELETE branch
router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM Branch WHERE BranchId = ?',
        [req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true });
        }
    );
});

module.exports = router;
