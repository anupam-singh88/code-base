const express = require('express');
const { addProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addProducts);

module.exports = router;
