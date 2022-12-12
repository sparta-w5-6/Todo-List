const SignupRepository = require("../repositories/signup.repository")

const { Users } = require("../models/index")

class SignupService {
  signupRepository = new SignupRepository(Users)

  registerUser = async (email, nickname, password) => {
    const registerUserData = await this.signupRepository.registerUser(email, nickname, password)

    return {
      userId: registerUserData.userId,
      email: registerUserData.email,
      nickname: registerUserData.nickname,
      password: registerUserData.password,
      createdAt: registerUserData.createdAt,
      updatedAt: registerUserData.updatedAt,
    }
  }
}

module.exports = SignupService
