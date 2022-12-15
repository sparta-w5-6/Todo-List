const SignupController = require('../../../controllers/signup.controller');

let mockSignupService = { registerUser: jest.fn() };

let mockRequest = { body: jest.fn() };
let mockResponse = { status: jest.fn(), json: jest.fn() };

let signupController = new SignupController();

// signupController 의 signupService 를 mocksignupService 로 변경
signupController.signupService = mockSignupService;

describe('SignupController', () => {
  beforeEach(() => {
    // 메소드 체이닝으로 인해 반환값이 자신으로 설정되어야 함
    jest.resetAllMocks();
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });
  test('signup Controller registerUser Method by success', async () => {
    const signupRequestBodyParams = {
      email: 'test@test.com',
      nickname: 'testNick',
      password: 'test1234',
      confirm: 'test1234',
    };
    mockRequest.body = signupRequestBodyParams;

    const signupReturnValue = {
      userId: 1,
      email: 'test@test.com',
      nickname: 'testNick',
      password: 'test1234',
    };
    mockSignupService.registerUser = jest.fn(() => signupReturnValue);
    await signupController.registerUser(mockRequest, mockResponse);
    expect(mockSignupService.registerUser).toHaveBeenCalledTimes(1);
    expect(mockSignupService.registerUser).toHaveBeenCalledWith(
      signupRequestBodyParams.email,
      signupRequestBodyParams.nickname,
      signupRequestBodyParams.password,
      signupRequestBodyParams.confirm,
    );
  });
});
