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
    const sql = `
        SELECT o.OrderId, o.OrderDate, o.isPaid, p.ImagePath, p.Price
        FROM orders o
        LEFT JOIN orderItems i ON o.OrderId = i.OrderID
        LEFT JOIN products p ON i.ProductID = p.ProductId
        WHERE o.UserId = ?
        ORDER BY o.OrderDate DESC
    `;

    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).send(err);

        // Group by OrderId
        const grouped = {};
        results.forEach((row) => {
            if (!grouped[row.OrderId]) {
                grouped[row.OrderId] = {
                    id: `${row.OrderId}`,
                    date: new Date(row.OrderDate)
                        .toISOString()
                        .slice(0, 16)
                        .replace('T', ' '),
                    status: row.isPaid,
                    productImages: [],
                    total: 0,
                };
            }
            grouped[row.OrderId].productImages.push(
                `http://localhost:5000/images/Liqour/${row.ImagePath}`
            );
            grouped[row.OrderId].total += Number(row.Price);
        });

        const finalArray = Object.values(grouped);
        res.json(finalArray);
    });
});
// Get orders by userId and productId
router.get('/user/:userId/product/:productId', (req, res) => {
    const { userId, productId } = req.params;

    const sql = `
    SELECT o.OrderId, o.OrderDate, o.isPaid, p.ImagePath, p.Price , i.Quantity, p.ProductName, 
    l.isAnotherPerson , l.Title, l.Hot, l.Duureg, l.Horoo, l.f_name, l.l_name, l.phone_number,
    l.Detail, o.fname, o.lname, o.phone, o.barimt, o.register, o.orgName
    FROM orders o
    LEFT JOIN orderItems i ON o.OrderId = i.OrderID
    LEFT JOIN products p ON i.ProductID = p.ProductId
    LEFT JOIN location l ON l.LocationId = o.LocationId
    WHERE o.UserId = ? and o.OrderId= ?
    ORDER BY o.OrderDate DESC
`;

    db.query(sql, [userId, productId], (err, results) => {
        if (err) return res.status(500).send(err);

        // Group by OrderId
        const grouped = {};
        results.forEach((row) => {
            if (!grouped[row.OrderId]) {
                grouped[row.OrderId] = {
                    id: `${row.OrderId}`,
                    date: new Date(row.OrderDate)
                        .toISOString()
                        .slice(0, 16)
                        .replace('T', ' '),
                    status: row.isPaid,
                    productImages: [],
                    total: 0,
                    isAnotherPerson: row.isAnotherPerson,
                    l_Title: row.Title,
                    l_Hot: row.Hot,
                    l_Duureg: row.Duureg,
                    l_Horoo: row.Horoo,
                    l_f_name: row.f_name,
                    l_l_name: row.l_name,
                    l_phone_number: row.phone_number,
                    l_Detail: row.Detail,
                    fname: row.fname,
                    lname: row.lname,
                    phone: row.phone,
                    barimt: row.barimt,
                    register: row.register,
                    orgName: row.orgName,
                };
            }
            grouped[row.OrderId].productImages.push({
                img: `http://localhost:5000/images/Liqour/${row.ImagePath}`,
                quantity: row.Quantity,
                price: row.Price,
                total: row.Price * row.Quantity,
                name: row.ProductName,
            });
            grouped[row.OrderId].total += Number(row.Price);
        });

        const finalArray = Object.values(grouped);
        res.json(finalArray);
    });
});

// Create new order
router.post('/', (req, res) => {
    const {
        UserId,
        fname,
        lname,
        phone,
        barimt,
        register,
        orgName,
        isPaid,
        LocationId,
        products,
    } = req.body;
    console.log('creatin new order');
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).send('Products array is required');
    }
    console.log('UserId :', UserId);
    console.log('fname :', fname);
    console.log('lname :', lname);
    console.log('phone :', phone);
    console.log('barimt :', barimt);
    console.log('register :', register);
    console.log('orgName :', orgName);
    console.log('isPaid :', isPaid);
    console.log('LocationId :', LocationId);
    console.log('isPaid :', isPaid);

    db.query(
        `INSERT INTO Orders (UserId, fname , lname , phone, barimt, register, orgName,isPaid, LocationId) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
            UserId,
            fname,
            lname,
            phone,
            barimt,
            register,
            orgName,
            isPaid,
            LocationId,
        ],
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
