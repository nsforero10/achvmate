import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findById: jest.fn(),
  };

  const req = { user: { userId: 'user1' } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMe', () => {
    it('should map the current user context directly through the ID proxy', async () => {
      const mockResult = { id: 'user1', email: 'test@example.com' };
      mockUsersService.findById.mockResolvedValue(mockResult);

      expect(await controller.getMe(req)).toEqual(mockResult);
      expect(service.findById).toHaveBeenCalledWith('user1');
    });
  });
});
