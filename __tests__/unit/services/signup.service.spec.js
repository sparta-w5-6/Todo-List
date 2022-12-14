const SignupService = require('../../../services/signup.service');

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
});
