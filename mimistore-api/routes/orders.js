const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all orders with joined data
router.get('/', (req, res) => {
    const sql = `
    SELECT 
      o.OrderId,
      o.OrderDate,
      o.PaymentType,
      p.ProductName,
      p.Price,
      u.Username AS OrderedBy,
      l.Title AS LocationTitle
    FROM Orders o
    JOIN Products p ON o.ProductId = p.ProductId
    JOIN Users u ON o.UserId = u.UserId
    JOIN Location l ON o.LocationId = l.LocationId
    ORDER BY o.OrderDate DESC
  `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get orders by user ID
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query(
        `SELECT * FROM Orders WHERE UserId = ?`,
        [userId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
});

// Create new order
router.post('/', (req, res) => {
    const { ProductId, UserId, PaymentType, LocationId } = req.body;

    db.query(
        `INSERT INTO Orders (ProductId, UserId, PaymentType, LocationId) VALUES (?, ?, ?, ?)`,
        [ProductId, UserId, PaymentType, LocationId],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ OrderId: result.insertId });
        }
    );
});

// Delete an order
router.delete('/:id', (req, res) => {
    const orderId = req.params.id;
    db.query(`DELETE FROM Orders WHERE OrderId = ?`, [orderId], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true });
    });
});

module.exports = router;
