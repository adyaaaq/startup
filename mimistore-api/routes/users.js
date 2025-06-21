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
        Email,
        Password,
        FirstName,
        LastName,
        PhoneNumber,
        Role,
        BranchId,
        Genter,
        BirthDay,
    } = req.body;

    try {
        // Check for existing email or phone
        db.query(
            `SELECT * FROM Users WHERE Email = ? OR PhoneNumber = ?`,
            [Email, PhoneNumber],
            async (err, results) => {
                if (err) return res.status(500).send(err);

                if (results.length > 0) {
                    const existing = results[0];
                    if (existing.Email === Email) {
                        return res.status(400).json({
                            message: 'Email аль хэдийн бүртгэгдсэн байна',
                        });
                    } else if (existing.PhoneNumber === PhoneNumber) {
                        return res.status(400).json({
                            message:
                                'Утасны дугаар аль хэдийн бүртгэгдсэн байна',
                        });
                    }
                }

                const hashed = await bcrypt.hash(Password, 10);

                db.query(
                    `INSERT INTO Users 
                    (Email, Password, FirstName, LastName, PhoneNumber, Role, BranchId, Genter, BirthDay) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        Email,
                        hashed,
                        FirstName,
                        LastName,
                        PhoneNumber,
                        Role,
                        BranchId,
                        Genter,
                        BirthDay,
                    ],
                    (err, result) => {
                        if (err) return res.status(500).send(err);
                        res.status(201).json({ id: result.insertId });
                    }
                );
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// LOGIN (basic)
router.post('/login', (req, res) => {
    const { Username, Password } = req.body;

    // Email эсвэл PhoneNumber аль нэг байж болно
    console.log('we are loggin in');
    db.query(
        `SELECT * FROM Users WHERE Email = ? OR PhoneNumber = ?`,
        [Username, Username],
        async (err, results) => {
            if (err) return res.status(500).send(err);

            if (results.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Бүртгэлтэй хэрэглэгч олдсонгүй' });
            }

            const user = results[0];
            const valid = await bcrypt.compare(Password, user.Password);

            if (!valid) {
                return res
                    .status(401)
                    .json({ message: 'Имэйл/утас эсвэл нууц үг буруу байна' });
            }

            res.json({
                id: user.UserId,
                username: user.Email || user.PhoneNumber,
                role: user.Role,
                message: 'Нэвтрэлт амжилттай',
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
