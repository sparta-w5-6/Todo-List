const SignupRepository = require('../../../repositories/signup.repository');

const mockSignupModel = { registerUser: jest.fn(), findAllUser: jest.fn() };

let signupRepository = new SignupRepository();
signupRepository.Users = mockSignupModel;

describe('Signup Repository Layer test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // signup 에 create 메소드 테스트
  test('create Method test', async () => {
    const signupUserCreateParams = {
      email: 'test@register.com',
      nickname: 'testRegister',
      password: 'testPW123',
    };
    // 생성
    await signupRepository.Users.registerUser(
      signupUserCreateParams.email,
      signupUserCreateParams.nickname,
      signupUserCreateParams.password,
    );

    // create Method 가 1번 실행 됐는지
    expect(signupRepository.Users.registerUser).toHaveBeenCalledTimes(1);

    expect(signupRepository.Users.registerUser).toHaveBeenCalledWith(
      'test@register.com',
      'testRegister',
      'testPW123',
    );
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
