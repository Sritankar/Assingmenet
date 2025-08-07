const prisma = require('../utils/database');

const getAvailableSlots = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        error: {
          code: 'MISSING_DATES',
          message: 'From and to dates are required'
        }
      });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({
        error: {
          code: 'INVALID_DATES',
          message: 'Invalid date format'
        }
      });
    }

    toDate.setHours(23, 59, 59, 999);

    const slots = await prisma.slot.findMany({
      where: {
        startAt: {
          gte: fromDate,
          lte: toDate
        },
        booking: null
      },
      orderBy: {
        startAt: 'asc'
      }
    });

    res.json({ slots });
  } catch (error) {
    console.error('Get slots error:', error);
    res.status(500).json({
      error: {
        code: 'FETCH_SLOTS_FAILED',
        message: 'Failed to fetch available slots'
      }
    });
  }
};

module.exports = {
  getAvailableSlots
};
