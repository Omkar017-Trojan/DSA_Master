const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes (no auth required)
router.post('/register', register);
router.post('/login', login);

// Protected route (auth required)
// The protect middleware runs BEFORE getMe
router.get('/me', protect, getMe);

module.exports = router;
