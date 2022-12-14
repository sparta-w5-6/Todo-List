const LoginController = require('../../../controllers/login.controller');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

let mockLoginService = {
  loginUser: jest.fn(),
  findUser: jest.fn(),
  login: jest.fn(),
};

let mockRequest = { body: jest.fn() };
let mockResponse = { status: jest.fn(), json: jest.fn() };

loginController.loginService = mockLoginService;

describe('LoginController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status = jest(() => mockResponse);
  });

  test('login Controller login Method create token', async () => {
    const loginBodyParams = {
      email: 'test@test.com',
      password: '1234',
    };

    const tokenReturnValue = await loginController.loginService.login({
      email: loginBodyParams.email,
      password: loginBodyParams.password,
    });
    const token = mockResponse.cookie('token', token);
    expect(token).toEqual(token);
  });
});
