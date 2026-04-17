import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createJournalDto: CreateJournalDto) {
    return this.prisma.client.journalEntry.create({
      data: {
        title: createJournalDto.title,
        content: createJournalDto.content,
        ...(createJournalDto.date && { date: new Date(createJournalDto.date) }),
        user: { connect: { id: userId } },
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.client.journalEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const entry = await this.prisma.client.journalEntry.findFirst({
      where: { id, userId },
    });
    if (!entry) {
      throw new NotFoundException(`Journal Entry with ID ${id} not found.`);
    }
    return entry;
  }

  async update(id: string, userId: string, updateJournalDto: UpdateJournalDto) {
    const entry = await this.findOne(id, userId);
    return this.prisma.client.journalEntry.update({
      where: { id: entry.id },
      data: {
        title: updateJournalDto.title,
        content: updateJournalDto.content,
      },
    });
  }

  async remove(id: string, userId: string) {
    const entry = await this.findOne(id, userId);
    return this.prisma.client.journalEntry.delete({
      where: { id: entry.id },
    });
  }
}
