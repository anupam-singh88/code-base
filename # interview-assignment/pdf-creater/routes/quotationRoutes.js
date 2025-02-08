const express = require('express');
const { getQuotations } = require('../controllers/quotationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getQuotations);

module.exports = router;
