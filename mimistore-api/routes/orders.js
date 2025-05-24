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
    const { UserId, PaymentType, LocationId, products } = req.body;
    console.log('creatin new order');
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).send('Products array is required');
    }

    db.query(
        `INSERT INTO Orders (UserId, PaymentType, LocationId) VALUES (?, ?, ?)`,
        [UserId, PaymentType, LocationId],
        (err, result) => {
            if (err) return res.status(500).send(err);

            const orderId = result.insertId;

            // Prepare values for bulk insert
            const orderItems = products.map((p) => [
                orderId,
                p.productId,
                p.Quantity,
            ]);

            db.query(
                `INSERT INTO OrderItems (OrderID, ProductID, Quantity) VALUES ?`,
                [orderItems],
                (err2) => {
                    if (err2) return res.status(500).send(err2);

                    res.status(201).json({ OrderId: orderId });
                }
            );
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
