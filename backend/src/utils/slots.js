// placeholder
exports.generateSlots = (fromDate, toDate) => {
  const slots = [];
  const current = new Date(fromDate);
  const end = new Date(toDate);

  while (current <= end) {
    // Skip weekends (optional)
    if (current.getDay() !== 0 && current.getDay() !== 6) {
      const dayStart = new Date(current);
      dayStart.setHours(9, 0, 0, 0);
      
      while (dayStart.getHours() < 17) {
        const slotStart = new Date(dayStart);
        const slotEnd = new Date(dayStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + 30);
        
        slots.push({
          startAt: slotStart,
          endAt: slotEnd,
        });
        
        dayStart.setMinutes(dayStart.getMinutes() + 30);
      }
    }
    
    current.setDate(current.getDate() + 1);
  }

  return slots;
};
