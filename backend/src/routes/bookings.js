const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { bookSlot, getMyBookings, getAllBookings } = require('../controllers/bookingController');

const router = express.Router();

router.post('/book', authenticate, requireRole('PATIENT'), bookSlot);
router.get('/my-bookings', authenticate, requireRole('PATIENT'), getMyBookings);
router.get('/all-bookings', authenticate, requireRole('ADMIN'), getAllBookings);

module.exports = router;
