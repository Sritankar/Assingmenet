const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { bookSlot, getMyBookings, getAllBookings } = require('../controllers/bookingController');

const router = express.Router();

// Patient books a slot
router.post('/book', authenticate, requireRole('PATIENT'), bookSlot);

// Patient views their own bookings
router.get('/my-bookings', authenticate, requireRole('PATIENT'), getMyBookings);

// Admin views all bookings
router.get('/all-bookings', authenticate, requireRole('ADMIN'), getAllBookings);

module.exports = router;
