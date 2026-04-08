import { prisma } from '@achvmate/database';

export const cleanDatabase = async () => {
  if (process.env.NODE_ENV !== 'test' && !process.env.DATABASE_URL?.includes('test')) {
    console.warn('Cowardly refusing to run DB cleanup outside of a test environment to prevent data loss.');
    return;
  }
  
  // Note: Depending on your schema logic, you might just truncate or delete specific tables
  // We specify the order manually if there are foreign keys, or ideally use prisma raw TRUNCATE CASCADE
  await prisma.$transaction([
    prisma.habit.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
