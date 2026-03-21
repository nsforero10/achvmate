import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Configuramos el adaptador igual que en tu Service
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(
    '🔍 DATABASE_URL detectada en el script:',
    process.env.DATABASE_URL,
  );
  console.log('🌱 Iniciando seeding...');

  const nico = await prisma.user.upsert({
    where: { email: 'ns.forero10@gmail.com' },
    update: {},
    create: {
      email: 'ns.forero10@gmail.com',
      name: 'Nicolás Forero',
    },
  });

  console.log({ nico });
  console.log('✅ Seeding finalizado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
