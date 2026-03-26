import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello() {
    try {
      const userCount = await this.prisma.client.user.count();
      return {
        message: 'Hello World from NestJS!',
        usersInDatabase: userCount,
        databaseConnected: true,
      };
    } catch (e: any) {
      return { error: String(e), url: process.env.DATABASE_URL };
    }
  }
}

