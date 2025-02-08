const express = require('express');
const router = express.Router();

const { save, login } = require('../controllers/user.controller')

router.route('/').get().post(save);
router.route('/login').post(login);

module.exports = router