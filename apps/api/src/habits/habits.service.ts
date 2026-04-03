import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createHabitDto: CreateHabitDto) {
    return this.prisma.client.habit.create({
      data: {
        ...createHabitDto,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.client.habit.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string, userId: string) {
    const habit = await this.prisma.client.habit.findFirst({
      where: { id, userId },
    });
    if (!habit) {
      throw new NotFoundException(`Habit with ID ${id} not found.`);
    }
    return habit;
  }

  async update(id: string, userId: string, updateHabitDto: UpdateHabitDto) {
    const habit = await this.findOne(id, userId);
    return this.prisma.client.habit.update({
      where: { id: habit.id },
      data: updateHabitDto,
    });
  }

  async remove(id: string, userId: string) {
    const habit = await this.findOne(id, userId);
    return this.prisma.client.habit.delete({
      where: { id: habit.id },
    });
  }
}
