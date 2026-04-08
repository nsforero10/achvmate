import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { cleanDatabase } from './setup';

describe('HabitsController (e2e)', () => {
  let app: INestApplication;

  const mockUser = { userId: 'e2e-test-user-id', email: 'test@example.com' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: any) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    await cleanDatabase();
  });

  afterAll(async () => {
    await cleanDatabase();
    await app.close();
  });

  let createdHabitId: string;

  it('/habits (POST) - should create a habit', async () => {
    const response = await request(app.getHttpServer())
      .post('/habits')
      .send({ title: 'Test Habit', description: 'Testing E2E' })
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Habit');
    createdHabitId = response.body.id;
  });

  it('/habits (GET) - should list habits', async () => {
    const response = await request(app.getHttpServer())
      .get('/habits')
      .expect(200);
      
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0].userId).toBe(mockUser.userId);
  });
});
