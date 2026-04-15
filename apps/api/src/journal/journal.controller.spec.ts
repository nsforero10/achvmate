import { Test, TestingModule } from '@nestjs/testing';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';

describe('JournalController', () => {
  let controller: JournalController;
  let service: JournalService;

  const mockJournalService = {
    create: jest.fn(),
    findAllByUser: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const req = { user: { userId: 'user1' } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalController],
      providers: [{ provide: JournalService, useValue: mockJournalService }],
    }).compile();

    controller = module.get<JournalController>(JournalController);
    service = module.get<JournalService>(JournalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate persistence creation requests properly', async () => {
    const dto = { title: 'T', content: 'C' };
    mockJournalService.create.mockResolvedValue({ id: '1', ...dto });

    expect(await controller.create(req, dto as any)).toEqual({ id: '1', ...dto });
    expect(service.create).toHaveBeenCalledWith('user1', dto);
  });

  it('should pull lists via strictly evaluated bounds', async () => {
    mockJournalService.findAllByUser.mockResolvedValue([{ id: '1', title: 'T' }]);
    expect(await controller.findAll(req)).toEqual([{ id: '1', title: 'T' }]);
    expect(service.findAllByUser).toHaveBeenCalledWith('user1');
  });

  it('should call update by routing ids correctly', async () => {
    const dto = { title: 'T2' };
    mockJournalService.update.mockResolvedValue({ id: '1', ...dto });
    expect(await controller.update(req, '1', dto as any)).toEqual({ id: '1', ...dto });
    expect(service.update).toHaveBeenCalledWith('1', 'user1', dto);
  });

  it('should explicitly request single entries finding elements directly', async () => {
    mockJournalService.findOne.mockResolvedValue({ id: '1', title: 'T' });
    expect(await controller.findOne(req, '1')).toEqual({ id: '1', title: 'T' });
    expect(service.findOne).toHaveBeenCalledWith('1', 'user1');
  });

  it('should seamlessly execute bounds removal', async () => {
    mockJournalService.remove.mockResolvedValue({ id: '1' });
    expect(await controller.remove(req, '1')).toEqual({ id: '1' });
    expect(service.remove).toHaveBeenCalledWith('1', 'user1');
  });
});
