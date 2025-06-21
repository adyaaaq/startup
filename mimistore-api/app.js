const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/locations', require('./routes/location'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/branches', require('./routes/branch'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

const { swaggerUi, swaggerDocs } = require('./swagger'); // ← өмнөх алхамд үүсгэсэн
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
