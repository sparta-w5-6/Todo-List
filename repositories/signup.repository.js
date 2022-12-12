class SignupRepository {
  constructor(userModel) {
    this.userModel = userModel
  }
  registerUser = async (email, nickname, password) => {
    const registerUserData = await this.userModel.create({ email, nickname, password })

    return registerUserData
  }
}

module.exports = SignupRepository
