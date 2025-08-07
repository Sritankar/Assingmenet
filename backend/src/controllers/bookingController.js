const prisma = require('../utils/database');

const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.body;
    const userId = req.user.id;

    if (!slotId) {
      return res.status(400).json({
        error: { code: 'MISSING_SLOT_ID', message: 'Slot ID is required' }
      });
    }

    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
      include: { booking: true }
    });

    if (!slot) {
      return res.status(404).json({
        error: { code: 'SLOT_NOT_FOUND', message: 'Slot not found' }
      });
    }

    if (slot.booking) {
      return res.status(409).json({
        error: { code: 'SLOT_TAKEN', message: 'This slot is already booked' }
      });
    }

    const booking = await prisma.booking.create({
      data: { userId, slotId },
      include: {
        slot: true,
        user: { select: { id: true, name: true, email: true } }
      }
    });

    res.status(201).json({
      message: 'Slot booked successfully',
      booking
    });
  } catch (error) {
    console.error('Booking error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: { code: 'SLOT_TAKEN', message: 'This slot is already booked' }
      });
    }
    res.status(500).json({
      error: { code: 'BOOKING_FAILED', message: 'Failed to book slot' }
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { slot: true },
      orderBy: { slot: { startAt: 'asc' } }
    });
    res.json({ bookings });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({
      error: { code: 'FETCH_BOOKINGS_FAILED', message: 'Failed to fetch bookings' }
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        slot: true,
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { slot: { startAt: 'asc' } }
    });
    res.json({ bookings });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      error: { code: 'FETCH_BOOKINGS_FAILED', message: 'Failed to fetch all bookings' }
    });
  }
};

module.exports = {
  bookSlot,
  getMyBookings,
  getAllBookings
};
