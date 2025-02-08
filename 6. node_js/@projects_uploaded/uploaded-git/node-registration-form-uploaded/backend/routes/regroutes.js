const express = require('express');

const RegModel = require('../models/RegistrationModel');

const { baseURL } = require('../controllers/routeController')

const router = express.Router();

router.post('/savedata', baseURL)

module.exports = router;