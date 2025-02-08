// routes/posts.js
const express = require('express');
const router = express.Router();
const { Post, User, Tag } = require('../models');

// Create a new post
router.post('/', async (req, res) => {
    const post = await Post.create(req.body);
    res.json(post);
});

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.findAll({ include: [User, Tag] });
    res.json(posts);
});

// Update a post
router.put('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    await post.update(req.body);
    res.json(post);
});

// Delete a post
router.delete('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    res.json({ message: 'Post deleted' });
});

module.exports = router;
