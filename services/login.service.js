const LoginRepository = require("../repositories/login.repository")
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY
const jwt = require("jsonwebtoken")

class LoginService {
  loginRepository = new LoginRepository()

  findUser = async (email) => {
    const user = await this.loginRepository.findUser(email)
    if (!user) {
      throw Error("존재하지 않는 회원입니다.")
    }
    return user
  }
  login = async (user, password) => {
    if (user.password !== password) {
      throw Error("비밀번호가 일치하지 않습니다.")
    }
    const token = jwt.sign({ userId: user.userId, email: user.email, nickname: user.nickname }, SECRET_KEY)
    return token
  }
}

module.exports = LoginService
