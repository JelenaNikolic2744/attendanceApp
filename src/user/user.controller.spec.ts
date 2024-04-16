import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { dbResponseStub, userStub } from './stubs/user.stub';

jest.mock('./user.service');

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useValue: {
        getUsers: jest.fn().mockResolvedValue([userStub()]),
        addDateArrival: jest.fn().mockReturnValue(dbResponseStub()),
        resetDateArrival: jest.fn().mockReturnValue(dbResponseStub()),
        updatePassword: jest.fn().mockReturnValue(dbResponseStub()),
        addMyFollowers: jest.fn().mockReturnValue(dbResponseStub()),
        removeMyFollower: jest.fn().mockReturnValue(dbResponseStub()),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceProvider],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('users', () => {
    it('should get an array of users', () => {
      expect(userController.getUsers()).resolves.toEqual([userStub()]);
    });

    it('should update user password', () => {
      const mockPassData = { email: 'test', password: 'test1' };
      expect(userController.updatePassword(mockPassData)).resolves.toEqual(
        dbResponseStub(),
      );
    });
  });

  describe('arrival', () => {
    it('should add date arrival', () => {
      expect(userController.addDateArrival(userStub())).resolves.toEqual(
        dbResponseStub(),
      );
    });

    it('should reset date arrival', () => {
      expect(userController.resetDateArrival(userStub())).resolves.toEqual(
        dbResponseStub(),
      );
    });
  });

  describe('followers', () => {
    it('should remove user followers', () => {
      const mockRemoveFollowerData = {
        email: 'test',
        follower: { email: 'test', name: 'test', lastname: 'test' },
      };
      expect(
        userController.removeMyFollower(mockRemoveFollowerData),
      ).resolves.toEqual(dbResponseStub());
    });

    it('should add user followers', () => {
      const mockAddFollowerData = {
        email: 'test',
        following: [{ email: 'test', name: 'test', lastname: 'test' }],
      };
      expect(
        userController.addMyFollowers(mockAddFollowerData),
      ).resolves.toEqual(dbResponseStub());
    });
  });
});
