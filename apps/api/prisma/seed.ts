import { prisma } from '@achvmate/database';

async function main() {
  console.log("Seeding database...");
  
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@achvmate.com' },
    update: {},
    create: {
      email: 'alice@achvmate.com',
      name: 'Alice',
      habits: {
        create: [
          {
            name: 'Drink Water',
            description: 'Drink 2 liters of water daily',
            frequency: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            time: '08:00',
          },
          {
            name: 'Read',
            description: 'Read 10 pages of a book',
            frequency: ['MON', 'WED', 'FRI'],
          }
        ]
      }
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@achvmate.com' },
    update: {},
    create: {
      email: 'bob@achvmate.com',
      name: 'Bob',
      habits: {
        create: [
          {
            name: 'Run',
            description: 'Run 5km',
            frequency: ['TUE', 'THU', 'SAT'],
            time: '06:00',
          }
        ]
      }
    },
  });

  console.log("Seeding finished.");
  console.log("Created users:", [user1.name, user2.name]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
