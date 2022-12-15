const LoginRepository = require('../../../repositories/login.repository');

const mockLoginModel = { findOne: jest.fn() };

let loginRepository = new LoginRepository(mockLoginModel);
describe('Login Repository layer test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('findOne Methods toHaveBeenCalled', async () => {
    // mock 객체 생성
    mockLoginModel.findOne = jest.fn(() => {
      return 'findOne result';
    });
    const userLogin = await loginRepository.findUser();
    // LoginModel 에 있는 findOne 메소드는 1번만 호출되는지.
    expect(mockLoginModel.findOne).toHaveBeenCalledTimes(1);
    // findUser메소드를 실행한 결과가 반환되는지
    expect(userLogin).toEqual('findOne result');
  });
});
