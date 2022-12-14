const authMiddleware = require('../../../middlewares/authMiddleware');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

// jsonwebtoken 을 모킹한다.
jest.mock('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    return next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};
const next = jest.fn();
test('success for jwt.verfiy method', () => {
  const token = jwt.sign(
    {
      userId: '1',
      nickname: 'naji',
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1m',
      issuer: 'najiwon',
    },
  );
  const req = {
    headers: {
      authorization: token,
    },
  };
  verifyToken(req, res, next);
  expect(next).toHaveBeenCalledTimes(1);
});
