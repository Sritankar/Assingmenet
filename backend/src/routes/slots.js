const express = require('express');
const { authenticate } = require('../middleware/auth');
const { getAvailableSlots } = require('../controllers/slotController');

const router = express.Router();

router.get('/', authenticate, getAvailableSlots);

module.exports = router;
