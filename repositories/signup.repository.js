const { Users } = require("../models")
const { Op } = require("sequelize")

class SignupRepository {
  constructor(userModel) {
    this.userModel = userModel
  }
  registerUser = async (email, nickname, password) => {
    const registerUserData = await Users.create({ email, nickname, password })
    return registerUserData
  }
  findAllUser = async (email, nickname) => {
    const findAllUsers = await Users.findAll({ where: { [Op.or]: [{ email }, { nickname }] } })
    return findAllUsers
  }
}

module.exports = SignupRepository
