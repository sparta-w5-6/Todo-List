const SignupRepository = require('../../../repositories/signup.repository');

const mockSignupModel = { create: jest.fn(), findAll: jest.fn() };

let signupRepository = new SignupRepository(mockSignupModel);

describe('Signup Repository Layer test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // signup 에 create 메소드 테스트
  test('create Method test', async () => {
    mockSignupModel.create = jest.fn(() => {
      return 'test Signup create User';
    });
    const signupUserCreateParams = {
      email: 'test@register.com',
      nickname: 'testRegister',
      password: 'testPW123',
    };
    const signupUserData = await signupRepository.registerUser(
      signupUserCreateParams.email,
      signupUserCreateParams.nickname,
      signupUserCreateParams.password,
    );

    // create Method 가 1번 실행 됐는지
    expect(mockSignupModel.create).toHaveBeenCalledTimes(1);

    // create Method의 결과가 registerUser의 결과와 일치하는지
    expect(signupUserData).toEqual('test Signup create User');
  });

  // signup 에 findAll 메소드 테스트
  test('findAll Method test', async () => {
    mockSignupModel.findAll = jest.fn(() => {
      return 'test Signup findAll result';
    });
    const signupFindAll = await signupRepository.findAllUser();
    expect(mockSignupModel.findAll).toHaveBeenCalledTimes(1);
    expect(signupFindAll).toEqual('test Signup findAll result');
  });
});
