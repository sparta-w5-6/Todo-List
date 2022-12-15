// type: value 형태로 토큰이 없을 때 에러 throw / 있을 때

//  verify 유효하지 않은 토큰일 때 / 유효할 때

// userId -- findByPk 성공 / 실패

// authMiddleware 자체를 isLogin으로 불러온다.
// const { isLogin } = require('../../../middlewares/authMiddleware');
// const { mockRequest, mockResponse } = require('jest-mock-req-res');
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY;
// const AuthorizationError = require('../../../exception/index.exception');
// const mockLoginService = { login: jest.fn() };
// const next = jest.fn();
// describe('Auth Middleware', () => {
//   test('헤더에 토큰이 없다면 AuthorizationError를 반환한다.', async () => {
//     const reqAuthorizationError = 'AuthorizationError';

//     expect(reqAuthorizationError).toEqual(
//       AuthorizationError.AuthorizationError.name,
//     );
//   });
//   test('헤더에 토큰이 있다면 토큰을 검증한다.', async () => {
//     const mockToken = mockLoginService.login({
//       email: 'test@test.com',
//       password: '1234',
//     });
//     const token = jwt.sign({ mockToken }, SECRET_KEY);
//     expect(next)
//   });
// });

const authMiddleware = require('../../../middlewares/authMiddleware');
const AuthorizationError = require('../../../exception/index.exception');
describe('Auth middleware test', () => {
  const res = {
    // 메소드 체이닝으로 인한 재귀함수
    status: jest.fn(() => res),
    json: jest.fn,
  };
  const next = jest.fn;

  //   TODO: 헤더에 토큰이 있는 경우를 어떻게 테스트하지?
  test('로그인이 되어 있으면 next()를 호출한다.', () => {
    // 헤더에 토큰이 있어야됨
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    authMiddleware(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('헤더에 토큰이 없다면 AuthorizationError를 반환한다.', async () => {
    const reqAuthorizationError = 'AuthorizationError';

    expect(reqAuthorizationError).toEqual(
      AuthorizationError.AuthorizationError.name,
    );
  });
});
