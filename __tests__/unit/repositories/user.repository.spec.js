const UserRepository = require('../../../repositories/user.repository');

const mockUserModel = { findOne: jest.fn() };

let userRepository = new UserRepository(mockUserModel);
describe('User Repository layer test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('findOne Methods toHaveBeenCalled', async () => {
    // mock 객체 생성
    mockUserModel.findOne = jest.fn(() => {
      return 'findOne result';
    });
    const user = await userRepository.getUser();
    // UserModel 에 있는 findOne 메소드는 1번만 호출되는지.
    expect(mockUserModel.findOne).toHaveBeenCalledTimes(1);
    // findUser메소드를 실행한 결과가 반환되는지
    expect(user).toEqual('findOne result');
  });
});
