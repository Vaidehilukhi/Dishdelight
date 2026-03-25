const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to check if user is admin (This is a basic check, ideally use JWT middleware)
const isAdmin = async (req, res, next) => {
    // For simplicity, we are expecting the role to be passed in headers or body for now
    // In a real app, you'd verify the token and check the role from the decoded token
    const { role } = req.headers;
    if (role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

// GET: Fetch all users
router.get('/users', async (req, res) => {
    try {
        const [users] = await db.execute('SELECT id, name, email, phoneNumber, role FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// DELETE: Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// GET: Fetch all reviews
router.get('/reviews', async (req, res) => {
    try {
        const [reviews] = await db.execute(`
            SELECT rv.*, r.title as recipeTitle 
            FROM reviews rv 
            JOIN recipes r ON rv.recipeId = r.id 
            ORDER BY rv.createdAt DESC
        `);
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

// DELETE: Delete a review
router.delete('/reviews/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM reviews WHERE id = ?', [req.params.id]);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting review' });
    }
});

// GET: Fetch all contact messages
router.get('/contact', async (req, res) => {
    try {
        const [messages] = await db.execute('SELECT * FROM contact_messages ORDER BY createdAt DESC');
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

module.exports = router;
