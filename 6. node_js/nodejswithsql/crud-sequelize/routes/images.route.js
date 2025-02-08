// images.route.js
const express = require('express');
const router = express.Router();

const { upload } = require('../controllers/image.controller');
const imageUploader = require('../helpers/image-uploader');
const auth = require('../middleware/auth.middleware');

router.route('/up').post(auth, imageUploader.single('image'), upload);
// router.route('/').get((req, res) => {
//     res.send('Hello world');
// })

module.exports = router;
