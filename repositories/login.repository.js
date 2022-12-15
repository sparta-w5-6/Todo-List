class LoginRepository {
  constructor(LoginModel) {
    this.LoginModel = LoginModel;
  }
  findUser = async (email) => {
    // Users DB 에서 userId와 email을 가져온다.
    const users = await this.LoginModel.findOne({ where: { email } });

    return users;
  };
}

module.exports = LoginRepository;
