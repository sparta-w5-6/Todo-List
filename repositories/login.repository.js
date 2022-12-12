const { Users } = require("../models")

class LoginRepository {
  findUser = async (email) => {
    // Users DB 에서 userId와 email을 가져온다.
    const users = await Users.findOne({ where: { email } })

    return users
  }
}

module.exports = LoginRepository
