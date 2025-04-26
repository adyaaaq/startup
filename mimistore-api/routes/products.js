const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db'); //
const fs = require('fs');
// GET all products
router.get('/', (req, res) => {
    const { type, isSuggest } = req.query;

    let query = `
    SELECT p.*, c.CategoryName , b.BranchName
    FROM products p
    LEFT JOIN categories c ON p.CategoryId = c.CategoryId
    LEFT JOIN Branch b ON b.BranchId = p.BranchId
  `;

    const conditions = [];
    const params = [];

    if (type) {
        conditions.push('p.Type = ?');
        params.push(type);
    }

    if (isSuggest) {
        conditions.push('p.isSuggest = ?');
        params.push(isSuggest);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).send(err);

        const fixed = results.map((p) => ({
            ...p,
            Price: Number(p.Price),
            BranchId: Number(p.BranchId),
            CategoryId: Number(p.CategoryId),
            ProductId: Number(p.ProductId),
            Type: p.Type,
            ImageUrl: p.ImagePath
                ? `http://localhost:5000/images/Liqour/${p.ImagePath}`
                : null,
        }));

        res.json(fixed);
    });
});

// GET single product
router.get('/:id', (req, res) => {
    db.query(
        'SELECT * FROM Products WHERE ProductId = ?',
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result[0]);
        }
    );
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images/Liqour'));
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// POST new product
router.post('/', upload.single('ImageFile'), (req, res) => {
    const { ProductName, Price, CategoryId, BranchId, Type } = req.body;
    const imagePath = req.file ? `${req.file.filename}` : null;

    db.query(
        'INSERT INTO Products (ProductName, Price, ImagePath, CategoryId, BranchId, Type) VALUES (?, ?, ?, ?, ?, ?)',
        [ProductName, Price, imagePath, CategoryId, BranchId, Type],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: result.insertId, imagePath });
        }
    );
});

// PUT update product
router.put('/:id', upload.single('ImageFile'), (req, res) => {
    const { ProductName, Price, CategoryId, BranchId, Type } = req.body;
    const productId = req.params.id;

    // Step 1: Fetch current image path from DB
    const getQuery = 'SELECT ImagePath FROM Products WHERE ProductId = ?';
    db.query(getQuery, [productId], (err, rows) => {
        if (err) return res.status(500).send(err);

        const currentImagePath = rows[0]?.ImagePath;
        let newImagePath = req.body.ImagePath; // fallback if no new file

        // Step 2: If new image uploaded
        if (req.file) {
            newImagePath = `${req.file.filename}`;
            console.log('newImagePath : ', newImagePath);

            if (currentImagePath) {
                console.log('currentImagePath : ', currentImagePath);

                const fullPath = path.join(
                    __dirname,
                    '..',
                    'images',
                    'Liqour',
                    path.basename(currentImagePath)
                );
                console.log('fullPath :', fullPath);

                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.warn(
                            '⚠️ Failed to delete old image:',
                            unlinkErr.message
                        );
                    }
                });
            }
        } else {
            newImagePath = currentImagePath;
        }

        // Step 3: Update DB with new values

        const updateQuery = `
            UPDATE Products
            SET ProductName=?, Price=?, ImagePath=?, CategoryId=?, BranchId=?, Type=?
            WHERE ProductId=?
        `;
        db.query(
            updateQuery,
            [
                ProductName,
                Price,
                newImagePath,
                CategoryId,
                BranchId,
                Type,
                productId,
            ],
            (err) => {
                if (err) return res.status(500).send(err);
                res.json({ success: true, imagePath: newImagePath });
            }
        );
    });
});
// DELETE product
router.delete('/:id', (req, res) => {
    const productId = req.params.id;

    // Step 1: Get the current image path
    const getImageQuery = 'SELECT ImagePath FROM Products WHERE ProductId = ?';
    db.query(getImageQuery, [productId], (err, rows) => {
        if (err) return res.status(500).send(err);

        const imagePath = rows[0]?.ImagePath;

        // Step 2: Delete image file (if exists)
        if (imagePath) {
            const fullPath = path.join(
                __dirname,
                '..',
                'images',
                'Liqour',
                path.basename(imagePath)
            );
            fs.unlink(fullPath, (unlinkErr) => {
                if (unlinkErr) {
                    console.warn(
                        '⚠️ Failed to delete image file:',
                        unlinkErr.message
                    );
                } else {
                    console.log('✅ Image deleted:', fullPath);
                }
            });
        }

        // Step 3: Delete product from DB
        const deleteQuery = 'DELETE FROM Products WHERE ProductId = ?';
        db.query(deleteQuery, [productId], (err) => {
            if (err) return res.status(500).send(err);
            res.json({ success: true });
        });
    });
});
module.exports = router;
