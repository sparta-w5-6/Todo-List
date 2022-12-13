const SignupRepository = require('../../../repositories/signup.repository');

const mockSignupModel = { create: jest.fn(), findAll: jest.fn() };

let singupRepository = new SignupRepository(mockSignupModel);

describe('Signup Repository Layer test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('create Method toHaveBeenCalled', async () => {
    mockSignupModel.create = jest.fn(() => {
      return 'test Signup User';
    });
    const signupUserParams = {
      email: 'test@register.com',
      nickname: 'testRegister',
      password: 'testPW123',
    };
    const signupUserData = await singupRepository.registerUser(
      signupUserParams.email,
      signupUserParams.nickname,
      signupUserParams.password,
    );

    // create Method 가 1번 실행 됐는지
    expect(mockSignupModel.create).toHaveBeenCalledTimes(1);

    // create Method의 결과가 registerUser의 결과와 일치하는지
    expect(signupUserData).toEqual('test Signup User');
  });
});
