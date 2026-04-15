import { Test, TestingModule } from '@nestjs/testing';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

describe('HabitsController', () => {
  let controller: HabitsController;
  let service: HabitsService;

  const mockHabitsService = {
    create: jest.fn(),
    findAllByUser: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    toggleCompletion: jest.fn(),
  };

  const req = { user: { userId: 'user1' } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [{ provide: HabitsService, useValue: mockHabitsService }],
    }).compile();

    controller = module.get<HabitsController>(HabitsController);
    service = module.get<HabitsService>(HabitsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call service create mathematically mapped to user session block', async () => {
    const dto = { title: 'Test Habit', frequency: ['MON'], categoryId: 'cat1' };
    mockHabitsService.create.mockResolvedValue({ id: '1', ...dto });

    expect(await controller.create(req, dto as any)).toEqual({ id: '1', ...dto });
    expect(service.create).toHaveBeenCalledWith('user1', dto);
  });

  it('should call service findAllByUser pulling raw dataset arrays', async () => {
    mockHabitsService.findAllByUser.mockResolvedValue([{ id: '1', title: 'Test' }]);
    expect(await controller.findAll(req)).toEqual([{ id: '1', title: 'Test' }]);
    expect(service.findAllByUser).toHaveBeenCalledWith('user1');
  });

  it('should trigger service bounds toggling daily states', async () => {
    mockHabitsService.toggleCompletion.mockResolvedValue({ completed: true });
    expect(await controller.toggleCompletion(req, '1', '2026-04-15')).toEqual({ completed: true });
    expect(service.toggleCompletion).toHaveBeenCalledWith('1', 'user1', '2026-04-15');
  });

  it('should find single habit by id securely', async () => {
    mockHabitsService.findOne.mockResolvedValue({ id: '1', title: 'Test' });
    expect(await controller.findOne(req, '1')).toEqual({ id: '1', title: 'Test' });
    expect(service.findOne).toHaveBeenCalledWith('1', 'user1');
  });

  it('should update specific habit', async () => {
    const dto = { title: 'Updated' };
    mockHabitsService.update.mockResolvedValue({ id: '1', ...dto });
    expect(await controller.update(req, '1', dto as any)).toEqual({ id: '1', ...dto });
    expect(service.update).toHaveBeenCalledWith('1', 'user1', dto);
  });

  it('should remove habit mapping fully', async () => {
    mockHabitsService.remove.mockResolvedValue({ id: '1' });
    expect(await controller.remove(req, '1')).toEqual({ id: '1' });
    expect(service.remove).toHaveBeenCalledWith('1', 'user1');
  });
});
