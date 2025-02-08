// routes/users.js
const express = require('express');
const router = express.Router();
const { User, Profile } = require('../models');

// Create a new user
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// Get all users
router.get('/', async (req, res) => {
    const users = await User.findAll({ include: Profile });
    res.json(users);
});

// Update a user
router.put('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({ message: 'User deleted' });
});

module.exports = router;
