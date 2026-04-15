import { Test, TestingModule } from '@nestjs/testing';
import { JournalService } from './journal.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('JournalService', () => {
  let service: JournalService;
  let prisma: PrismaService;

  const mockPrismaService = {
    client: {
      journalEntry: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JournalService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<JournalService>(JournalService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully push new map entities', async () => {
      const dto = { title: 'Day 1', content: 'Testing content' };
      const expected = { id: 'entry1', ...dto };
      mockPrismaService.client.journalEntry.create.mockResolvedValue(expected);

      const result = await service.create('user1', dto as any);
      expect(result).toEqual(expected);
      expect(prisma.client.journalEntry.create).toHaveBeenCalledWith({
        data: {
          title: dto.title,
          content: dto.content,
          user: { connect: { id: 'user1' } },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should reject structurally absent requests', async () => {
      mockPrismaService.client.journalEntry.findFirst.mockResolvedValue(null);
      await expect(service.findOne('invalid', 'user1')).rejects.toThrow(NotFoundException);
    });

    it('should extract values directly', async () => {
      mockPrismaService.client.journalEntry.findFirst.mockResolvedValue({ id: '1' });
      expect(await service.findOne('1', 'user1')).toEqual({ id: '1' });
    });
  });

  describe('update', () => {
    it('should modify values strictly by reference', async () => {
      mockPrismaService.client.journalEntry.findFirst.mockResolvedValue({ id: '1' });
      mockPrismaService.client.journalEntry.update.mockResolvedValue({ id: '1', title: 'New' });

      expect(await service.update('1', 'user1', { title: 'New' } as any)).toEqual({ id: '1', title: 'New' });
    });
  });

  describe('findAllByUser', () => {
    it('should collect entirely distinct listings globally', async () => {
      const arr = [{ id: '1' }];
      mockPrismaService.client.journalEntry.findMany.mockResolvedValue(arr);
      expect(await service.findAllByUser('user1')).toEqual(arr);
    });
  });

  describe('remove', () => {
    it('should map deletions against the schema recursively', async () => {
      mockPrismaService.client.journalEntry.findFirst.mockResolvedValue({ id: '1' });
      mockPrismaService.client.journalEntry.delete.mockResolvedValue({ id: '1' });

      expect(await service.remove('1', 'user1')).toEqual({ id: '1' });
    });
  });
});
