import { prisma } from '@achvmate/database';

export const cleanDatabase = async () => {
  if (process.env.NODE_ENV !== 'test' && !process.env.DATABASE_URL?.includes('test')) {
    console.warn('Cowardly refusing to run DB cleanup outside of a test environment to prevent data loss.');
    return;
  }
  
  await prisma.$transaction([
    prisma.habit.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
