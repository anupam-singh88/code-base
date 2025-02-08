const express = require('express');
const router = express.Router();

const { save, showAll, show, store, update, destroy } = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');


// router.post('/', save);
router.route('/').get(auth, showAll).post(save)
router.route('/:id').get(show).patch(update).delete(destroy)


module.exports = router;