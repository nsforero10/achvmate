import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import { defineConfig, env } from 'prisma/config';


const isDockerRoot = __dirname === '/app';
const databaseDir = isDockerRoot ? './packages/database' : '../../packages/database';

export default defineConfig({
  schema: path.resolve(__dirname, databaseDir, 'prisma/schema.prisma'),
  migrations: {
    path: path.resolve(__dirname, databaseDir, 'prisma/migrations'),
    seed: 'ts-node ' + path.resolve(__dirname, databaseDir, 'prisma/seed.ts'),
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});

