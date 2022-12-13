const { Users } = require('../models');

const LoginRepository = require('../repositories/login.repository');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const { ValidationError } = require('../exception/index.exception');

class LoginService {
  loginRepository = new LoginRepository(Users);

  findUser = async (email) => {
    const user = await this.loginRepository.findUser(email);
    if (!user) {
      throw new ValidationError('존재하지 않는 회원입니다.');
    }
    return user;
  };

  login = async (user, password) => {
    if (!password) {
      throw new ValidationError('비밀번호를 입력해 주세요');
    }
    if (user.password !== password) {
      throw new ValidationError('비밀번호가 일치하지 않습니다.');
    }
    const expires = new Date();
    expires.setHours(expires.getHours() + 10);
    const token = jwt.sign(
      { userId: user.userId, email: user.email, nickname: user.nickname },
      SECRET_KEY,
    );
    return token;
  };
}

module.exports = LoginService;
