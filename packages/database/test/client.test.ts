import { prisma } from '../src/index';

describe('Prisma Database Client', () => {
  it('should instantiate the prisma client without throwing errors', () => {
    expect(prisma).toBeDefined();
    expect(typeof prisma.$queryRaw).toBe('function');
  });
});
