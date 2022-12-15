const SignupService = require('../../../services/signup.service');
const ValidationError = require('.../../../exception/index.exception');
const valiError = new ValidationError.ValidationError();
let mockSignupRepository = {
  findAllUser: jest.fn(),
  registerUser: jest.fn(),
  split: jest.fn(),
};

let signupService = new SignupService();

signupService.signupRepository = mockSignupRepository;

describe('Signup Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('email split by @ test', () => {
    const mockEmail = 'test@example.com';
    const mockEmailReturnValue = ['test', 'example.com'];

    expect(mockEmail.split('@')).toEqual(mockEmailReturnValue);
  });

  test('signup service findAllUsers test', () => {
    const findAllUsers = [
      {
        userId: 1,
        email: 'test@test.com',
        password: '1234',
        createdAt: new Date('14 December 2022 00:00'),
        updatedAt: new Date('14 December 2022 01:00'),
      },
      {
        userId: 2,
        email: 'test2@test.com',
        password: '1234',
        createdAt: new Date('14 December 2022 01:00'),
        updatedAt: new Date('14 December 2022 02:00'),
      },
    ];
    const findAllUserReturnValue = {
      userid: 1,
      email: 'test3@test.com',
      password: '1234',
      confirm: '1234',
    };
    expect(findAllUsers).not.toEqual(
      expect.objectContaining(findAllUserReturnValue),
    );
  });

  test('signup Service registerUser method test', async () => {
    const signupRequestBodyParams = {
      email: 'test@test.com',
      nickname: 'testNick',
      password: 'test1234',
    };
    const registerUserReturnValue = {
      userId: 1,
      email: 'test@test.com',
      nickname: 'testNick',
      createdAt: new Date().toString,
      updatedAt: new Date().toString,
    };

    expect(signupRequestBodyParams.email).toEqual(
      registerUserReturnValue.email,
    );
    expect(signupRequestBodyParams.nickname).toEqual(
      registerUserReturnValue.nickname,
    );
  });

  // test('이메일 형식이 올바르지 않으면 validationError', () => {});
  // test('이미 가입된 이메일이면 validationError', () => {});
  // test('비밀번호가 4글자 미만이면 validationError', () => {});
  // test('패스워드와 패스워드 확인이 일치하지 않으면 validationError', () => {});
});
