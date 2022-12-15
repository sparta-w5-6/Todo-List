const UserService = require('../../../services/user.service');
require('dotenv').config();
// getUser 메소드 모킹
let mockUserRepository = {
  getUser: jest.fn(),
};

// userService를 생성자로 생성
const userService = new UserService(mockUserRepository);
// userService 의 userRepository 에 mockLoginRepository의 메소드를 테스트하기 위함
userService.userRepository = mockUserRepository;

describe('User service test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('User Service getUser Method', async () => {
    // 가짜 mock 데이터 생성
    const getUserReturnValue = {
      userId: 1,
      email: 'test@test.com',
      password: '1234',
      createdAt: new Date('14 December 2022 00:00'),
      updatedAt: new Date('14 December 2022 01:00'),
    };
    mockUserRepository.getUser = jest.fn(() => getUserReturnValue);
    const user = await userService.getUser();

    expect(user).toEqual(getUserReturnValue);
    expect(mockUserRepository.getUser).toHaveBeenCalledTimes(1);
  });
});