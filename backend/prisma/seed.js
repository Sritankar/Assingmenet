const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data first (for clean slate)
  await prisma.booking.deleteMany({});
  await prisma.slot.deleteMany({});
  await prisma.user.deleteMany({});

  // Create admin user
  const adminPassword = await bcrypt.hash('Passw0rd!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create patient user
  const patientPassword = await bcrypt.hash('Passw0rd!', 12);
  const patient = await prisma.user.upsert({
    where: { email: 'patient@example.com' },
    update: {},
    create: {
      name: 'Patient User',
      email: 'patient@example.com',
      passwordHash: patientPassword,
      role: 'PATIENT',
    },
  });

  // Generate slots for the next 7 days
  const slots = [];
  const today = new Date();
  
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    date.setHours(9, 0, 0, 0); // Start at 9:00 AM
    
    while (date.getHours() < 17) { // Until 5:00 PM
      const startAt = new Date(date);
      const endAt = new Date(date);
      endAt.setMinutes(endAt.getMinutes() + 30);
      
      slots.push({
        startAt,
        endAt,
      });
      
      date.setMinutes(date.getMinutes() + 30);
    }
  }

  // Insert slots using createMany (without skipDuplicates)
  await prisma.slot.createMany({
    data: slots
  });

  console.log(`Database seeded successfully with ${slots.length} slots`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
