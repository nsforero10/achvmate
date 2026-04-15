import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Generating synthetic history for analytics...');
  
  const habits = await prisma.habit.findMany();
  console.log(`Found ${habits.length} habits in the database.`);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let createdCount = 0;

  for (let i = 365; i > 0; i--) {
    const d = new Date(today.getTime());
    d.setDate(d.getDate() - i);
    
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayCode = dayNames[d.getDay()];

    for (const habit of habits) {
      if (habit.frequency.includes(dayCode)) {
         // Guarantee a flawless streak for the last 45 days leading up to today to demonstrate the feature!
         // Days older than 45 get a 50% random generation rate
         const isCompleted = i <= 45 ? true : Math.random() > 0.5;
         
         if (isCompleted) {
           await prisma.dailyTrackEntry.upsert({
             where: { habitId_date: { habitId: habit.id, date: d } },
             update: { completed: true },
             create: { habitId: habit.id, date: d, completed: true },
           });
           createdCount++;
         } else {
           // Provide a few explicit boolean false records for history padding
           await prisma.dailyTrackEntry.upsert({
             where: { habitId_date: { habitId: habit.id, date: d } },
             update: { completed: false },
             create: { habitId: habit.id, date: d, completed: false },
           });
         }
      }
    }
  }

  console.log(`✅ Successfully back-filled ${createdCount} historical entries!`);
}

main()
  .catch((e) => {
    console.error('❌ Generator failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
