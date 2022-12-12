const SignupRepository = require("../repositories/signup.repository")

const { Users } = require("../models")
const { Op } = require("sequelize")

class SignupService {
  signupRepository = new SignupRepository()

  registerUser = async (email, nickname, password) => {
    const emailValidate = email.split("@") // 이메일 형식 확인
    const existUser = await this.signupRepository.findAllUser(email, nickname)
    if (emailValidate.length !== 2 || email[0] === "@" || email[email.length - 1] === "@") {
      throw Error("이메일의 형식이 올바르지 않습니다.")
    }
    if (existUser.length) {
      throw Error("이미 가입된 아이디 또는 닉네임입니다.")
    }
    if (password.length <= 3) {
      throw Error("비밀번호는 4글자 이상이어야 합니다.")
    }

    await this.signupRepository.registerUser(email, nickname, password)
    return true
  }
}

module.exports = SignupService
