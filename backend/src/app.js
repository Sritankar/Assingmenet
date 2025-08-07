const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const slotRoutes = require('./routes/slots');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate limit only on auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
});

// 1) Mount auth routes at /api
app.use('/api', authLimiter, authRoutes);

// 2) Mount slot routes at /api/slots
app.use('/api/slots', slotRoutes);

// 3) Mount booking routes at /api
app.use('/api', bookingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler (after all routes)
app.use('*', (req, res) => {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: 'Endpoint not found' }
  });
});

module.exports = app;
