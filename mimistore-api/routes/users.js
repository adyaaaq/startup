const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Хэрэглэгчтэй холбоотой API-ууд
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Бүх хэрэглэгчийг авах
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Амжилттай
 */
router.get('/', (req, res) => {
    db.query(
        'SELECT UserId, Username, FirstName, LastName, PhoneNumber, Role FROM Users',
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Нэг хэрэглэгч авах
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Хэрэглэгчийн ID
 *     responses:
 *       200:
 *         description: Амжилттай
 *       500:
 *         description: Алдаа гарлаа
 */
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

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Шинэ хэрэглэгч бүртгэх
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *               Role:
 *                 type: string
 *               BranchId:
 *                 type: integer
 *               Genter:
 *                 type: integer
 *               BirthDay:
 *                 type: string
 *     responses:
 *       201:
 *         description: Амжилттай бүртгэгдлээ
 *       400:
 *         description: Email эсвэл Утас бүртгэлтэй байна
 */
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
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Нэвтрэх (Email эсвэл Утас + Нууц үг)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 example: test@a.com
 *               Password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Амжилттай нэвтэрлээ
 *       401:
 *         description: Нууц үг буруу
 *       404:
 *         description: Хэрэглэгч олдсонгүй
 */
router.post('/login', (req, res) => {
    const { Username, Password } = req.body;

    console.log(Username, Password);
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
                phone: user.PhoneNumber,
                role: user.Role,
                gender: user.Genter,
                dob: user.BirthDay,
                email: user.Email,
                message: 'Нэвтрэлт амжилттай',
            });
        }
    );
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Хэрэглэгчийн мэдээлэл шинэчлэх
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Хэрэглэгчийн ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *               Role:
 *                 type: string
 *               BranchId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Амжилттай шинэчлэгдлээ
 */
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

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Хэрэглэгч устгах
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Хэрэглэгчийн ID
 *     responses:
 *       200:
 *         description: Амжилттай устгалаа
 */
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Users WHERE UserId = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true });
    });
});

module.exports = router;
