const LoginRepository = require('../../../repositories/login.repository');

const { findOneUser } = require('../../fixtures/login.fixtures');

const mockLoginModel = () => ({ findOne: jest.fn() });

describe('Login Repository layer test', () => {
  let loginRepository = new LoginRepository();
  loginRepository.Users = mockLoginModel();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('findOne Methods toHaveBeenCalled', async () => {
    const users = await loginRepository.findOne();

    expect(loginRepository.Users.find).toHaveBeenCalledTimes(1);
  });
});
