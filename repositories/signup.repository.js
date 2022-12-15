const { Op } = require('sequelize');

class SignupRepository {
  constructor(SignupModel) {
    this.SignupModel = SignupModel;
  }
  registerUser = async (email, nickname, password) => {
    const registerUserData = await this.SignupModel.create({
      email,
      nickname,
      password,
    });
    return registerUserData;
  };
  findAllUser = async (email, nickname) => {
    const findAllUsers = await this.SignupModel.findAll({
      where: { [Op.or]: [{ email }, { nickname }] },
    });
    console.log(
      '🚀 ~ file: signup.repository.js:19 ~ SignupRepository ~ findAllUser= ~ findAllUsers',
      findAllUsers,
    );

    return findAllUsers;
  };
}

module.exports = SignupRepository;
