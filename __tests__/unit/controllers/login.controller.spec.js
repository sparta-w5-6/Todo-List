const LoginController = require('../../../controllers/login.controller');

let mockLoginService = {
  loginUser: jest.fn(),
  findUser: jest.fn(),
  login: jest.fn(),
};

let mockRequest = { body: jest.fn() };
let mockResponse = { status: jest.fn(), json: jest.fn() };

// loginController.loginService = mockLoginService;

describe('LoginController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status = jest.fn(() => mockResponse);
  });

  // 로그인을 통해 토큰이 잘 생성되는지 테스트
  // body로 들어오는 email 과 password 가 db에 저장된 유저의 정보와 일치하다면(findUser)
  // service의 login 메소드를 통해 토큰을 생성하고, 그 쿠키를 response 한다.(login)
  test('login Controller login Method create token', async () => {
    const loginBodyParams = {
      email: 'test@test.com',
      password: '1234',
    };
    const token = mockLoginService.login({
      email: loginBodyParams.email,
      password: loginBodyParams.password,
    });
    expect(mockLoginService.login(loginBodyParams)).toEqual(token);
  });
});
