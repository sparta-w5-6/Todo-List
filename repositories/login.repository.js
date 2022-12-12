const { Users } = require("../models")

class LoginRepository {
  findUser = async (email) => {
    const findUserData = await Users.findOne({ where: { email } })
    return findUserData
  }
}

module.exports = LoginRepository
