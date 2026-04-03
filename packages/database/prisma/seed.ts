import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...\n');

  const passwordHash = await bcrypt.hash('password123', 10);

  const credentialsUser = await prisma.user.upsert({
    where: { email: 'test@achvmate.app' },
    update: { password: passwordHash },
    create: {
      email: 'test@achvmate.app',
      name: 'Test User',
      password: passwordHash,
    },
  });
  console.log('✅ Credentials user:', credentialsUser.email);
  console.log('   Login with: test@achvmate.app / password123\n');

  const oauthUser = await prisma.user.upsert({
    where: { email: 'ns.forero10@gmail.com' },
    update: {},
    create: {
      email: 'ns.forero10@gmail.com',
      name: 'Nicolás Forero',
      password: null,
    },
  });
  console.log('✅ OAuth user:', oauthUser.email);

  const habit1 = await prisma.habit.upsert({
    where: { id: 'seed-habit-1' },
    update: {},
    create: {
      id: 'seed-habit-1',
      name: 'Morning Run',
      description: 'Run at least 3km before breakfast',
      frequency: ['MON', 'WED', 'FRI'],
      time: '07:00',
      userId: credentialsUser.id,
    },
  });

  const habit2 = await prisma.habit.upsert({
    where: { id: 'seed-habit-2' },
    update: {},
    create: {
      id: 'seed-habit-2',
      name: 'Read 30 minutes',
      description: 'Read a non-fiction book',
      frequency: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      time: '21:00',
      userId: credentialsUser.id,
    },
  });
  console.log('✅ Habits created:', habit1.name, '/', habit2.name, '\n');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.dailyTrackEntry.upsert({
    where: { habitId_date: { habitId: habit1.id, date: today } },
    update: {},
    create: { habitId: habit1.id, date: today, completed: true },
  });

  await prisma.dailyTrackEntry.upsert({
    where: { habitId_date: { habitId: habit2.id, date: today } },
    update: {},
    create: { habitId: habit2.id, date: today, completed: false },
  });
  console.log('✅ Daily tracking entries created for today\n');

  await prisma.journalEntry.create({
    data: {
      title: 'First day with Achvmate',
      content: `# Day 1\n\nStarted tracking habits today. Completed my morning run but haven't read yet.\n\nFeeling motivated!`,
      userId: credentialsUser.id,
    },
  });
  console.log('✅ Journal entry created\n');

  console.log('🎉 Seed complete!\n');
  console.log('Test credentials login:');
  console.log('  Email:    test@achvmate.app');
  console.log('  Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
