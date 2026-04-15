import { Test, TestingModule } from '@nestjs/testing';
import { HabitsService } from './habits.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('HabitsService', () => {
  let service: HabitsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    client: {
      habit: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      dailyTrackEntry: {
        findFirst: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a new habit boundary', async () => {
      const dto = { title: 'Read', frequency: ['MON'], categoryId: 'cat1' };
      const expected = { id: '1', ...dto };
      mockPrismaService.client.habit.create.mockResolvedValue(expected);

      const result = await service.create('user1', dto as any);
      expect(result).toEqual(expected);
      expect(prisma.client.habit.create).toHaveBeenCalledWith({
        data: { ...dto, user: { connect: { id: 'user1' } } },
      });
    });
  });

  describe('findOne', () => {
    it('should return habit when actively found', async () => {
      const expected = { id: '1', title: 'Read' };
      mockPrismaService.client.habit.findFirst.mockResolvedValue(expected);

      const result = await service.findOne('1', 'user1');
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException if habit fails query bounds', async () => {
      mockPrismaService.client.habit.findFirst.mockResolvedValue(null);

      await expect(service.findOne('1', 'user1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllByUser', () => {
    it('should return all user routines', async () => {
      const arr = [{ id: '1' }];
      mockPrismaService.client.habit.findMany.mockResolvedValue(arr);
      expect(await service.findAllByUser('user1')).toEqual(arr);
    });
  });

  describe('update', () => {
    it('should update and map constraints properly', async () => {
      mockPrismaService.client.habit.findFirst.mockResolvedValue({ id: '1' });
      mockPrismaService.client.habit.update.mockResolvedValue({ id: '1', title: 'X' });

      expect(await service.update('1', 'user1', { title: 'X' } as any)).toEqual({ id: '1', title: 'X' });
    });
  });

  describe('remove', () => {
    it('should cleanly remove map components by user', async () => {
      mockPrismaService.client.habit.findFirst.mockResolvedValue({ id: '1' });
      mockPrismaService.client.habit.delete.mockResolvedValue({ id: '1' });

      expect(await service.remove('1', 'user1')).toEqual({ id: '1' });
    });
  });

  describe('toggleCompletion', () => {
    it('should create new tracking entry if none exists', async () => {
      mockPrismaService.client.habit.findFirst.mockResolvedValue({ id: '1' });
      mockPrismaService.client.dailyTrackEntry.findFirst.mockResolvedValue(null);
      mockPrismaService.client.dailyTrackEntry.create.mockResolvedValue({ id: 'entry1', completed: true });

      const res = await service.toggleCompletion('1', 'user1', '2026-04-15');
      expect(res.completed).toBe(true);
      expect(prisma.client.dailyTrackEntry.create).toHaveBeenCalled();
    });

    it('should update existing tracking entry flipping bounds natively', async () => {
      mockPrismaService.client.habit.findFirst.mockResolvedValue({ id: '1' });
      mockPrismaService.client.dailyTrackEntry.findFirst.mockResolvedValue({ id: 'entry1', completed: true });
      mockPrismaService.client.dailyTrackEntry.update.mockResolvedValue({ id: 'entry1', completed: false });

      const res = await service.toggleCompletion('1', 'user1', '2026-04-15');
      expect(res.completed).toBe(false);
      expect(prisma.client.dailyTrackEntry.update).toHaveBeenCalled();
    });
  });
});
