class UserRepository {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  getUser = async (userId) => {
    const users = await this.UserModel.findOne({ where: { userId } });

    return users;
  };
}

module.exports = UserRepository;