const express = require('express');
const cors = require('cors');

const app = express();

// ==================== MIDDLEWARE ====================
// Middleware = code that runs BEFORE your route handlers

// CORS middleware - allows your frontend (different port) to talk to this server
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser middleware - lets you read JSON from request bodies
// Without this, req.body would be undefined
app.use(express.json());

// URL-encoded parser - for form data
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const progressRoutes = require('./routes/progressRoutes');
const streakRoutes = require('./routes/streakRoutes');
const noteRoutes = require('./routes/noteRoutes');
const planRoutes = require('./routes/planRoutes');
const groupRoutes = require('./routes/groupRoutes');

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/streaks', streakRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/groups', groupRoutes);

// 404 handler - catches any request to undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler - catches any errors in routes
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

module.exports = app;
