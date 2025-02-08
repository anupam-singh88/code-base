const express = require('express');
const router = express.Router();
const { getFoodData } = require('../controllers/foodController');

router.get('/food', getFoodData);

module.exports = router;
