const LoginService = require('../../../services/login.service');
import jwt from jsonwebtoken
// findUser 메소드 모킹
let mockLoginRepository = {
  findUser: jest.fn(),
  login: jest.fn(),
  sign: jest.fn(),
};
jest.mock('jsonwebtoken');

// loginService를 생성자로 생성
const loginService = new LoginService(mockLoginRepository);
// loginService 의 loginRepository 에 mockLoginRepository의 메소드를 테스트하기 위함
loginService.loginRepository = mockLoginRepository;

describe('Login service test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Login Service findUser Method', async () => {
    // 가짜 mock 데이터 생성
    const findUserReturnValue = [
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
    mockLoginRepository.findUser = jest.fn(() => findUserReturnValue);
    const user = await loginService.findUser();

    expect(user).toEqual(findUserReturnValue);
    expect(mockLoginRepository.findUser).toHaveBeenCalledTimes(1);
  });


  // FIXME : 이거 어케 함
  // 1. login 메소드는 파라미터로 받아온 값들이 DB User 테이블에 있는 데이터(mock 데이터)와 일치하는지
  // 2. 일치하다면 정상적으로 토큰이 생성되는지

//   test('login Service sign Method', async () => {
//     const loginReturnValue = {
//       token:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5pY2tuYW1lIjoidGVzdCIsImlhdCI6MTY3MDk0OTYzMn0.bmeCk1wEVJBqmzfCXOCH9y85aPDZqC_xthLIWyOgaoU',
//     };
//     const loginBodyParams = { email: 'test@example.com', password: '1234' };
//   });
});
