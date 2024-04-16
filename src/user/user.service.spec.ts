import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { dbResponseStub, userStub } from './stubs/user.stub';

const hashPasswordString = 'some random characters';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const apiServiceProvider = {
      provide: UserService,
      useValue: {
        getUsers: jest.fn().mockResolvedValue([userStub()]),
        checkAuth: jest.fn().mockResolvedValue(userStub()),
        addDateArrival: jest.fn().mockReturnValue(dbResponseStub()),
        resetDateArrival: jest.fn().mockReturnValue(dbResponseStub()),
        resetAllDateArrival: jest.fn().mockReturnValue(dbResponseStub()),
        updatePassword: jest.fn().mockReturnValue(dbResponseStub()),
        addMyFollowers: jest.fn().mockReturnValue(dbResponseStub()),
        removeMyFollower: jest.fn().mockReturnValue(dbResponseStub()),
        hashPassword: jest.fn().mockResolvedValue(hashPasswordString),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, apiServiceProvider],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('users', () => {
    it('should get an array of users', () => {
      expect(service.getUsers()).resolves.toEqual([userStub()]);
    });

    it('should update user password', async () => {
      const mockPassData = { email: 'test@test.com', password: 'test1' };
      const testPass = await service.updatePassword(mockPassData);
      expect(testPass).toStrictEqual(dbResponseStub());
    });

    it('should checkAuth for user', () => {
      const mockAuthData = { email: 'test@test.com' };
      expect(service.checkAuth(mockAuthData)).resolves.toEqual(userStub());
    });

    it('should hashPassword for user', () => {
      expect(service.hashPassword(hashPasswordString)).resolves.toEqual(
        hashPasswordString,
      );
    });
  });

  describe('arrival', () => {
    it('should add date arrival', async () => {
      const testDateArrival = await service.addDateArrival(userStub());
      expect(testDateArrival).toStrictEqual(dbResponseStub());
    });

    it('should reset date arrival', async () => {
      const testResetDateArrival = await service.resetDateArrival(userStub());
      expect(testResetDateArrival).toStrictEqual(dbResponseStub());
    });
  });

  describe('followers', () => {
    it('should remove user followers', async () => {
      const mockRemoveFollowerData = {
        email: 'test',
        follower: { email: 'test', name: 'test', lastname: 'test' },
      };
      const testRemoveFollower = await service.removeMyFollower(
        mockRemoveFollowerData,
      );
      expect(testRemoveFollower).toStrictEqual(dbResponseStub());
    });

    it('should add user followers', async () => {
      const mockAddFollowerData = {
        email: 'test',
        following: [{ email: 'test', name: 'test', lastname: 'test' }],
      };
      const testAddFollower = await service.addMyFollowers(mockAddFollowerData);
      expect(testAddFollower).toStrictEqual(dbResponseStub());
    });
  });
});
