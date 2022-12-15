class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  getUser = async (userId) => {
    const users = await this.UserRepository.getUser(userId);

    return users;
  };
}

module.exports = UserService;
