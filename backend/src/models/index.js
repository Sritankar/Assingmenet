const prisma = require('../utils/database');

// Re-export for consistency
module.exports = {
  prisma,
  User: prisma.user,
  Slot: prisma.slot,
  Booking: prisma.booking,
};
