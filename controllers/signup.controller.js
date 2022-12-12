const SignupService = require('../services/signup.service.js');

class SignupController {
  signupService = new SignupService();

  registerUser = async (req, res, next) => {
    try {
      const { email, nickname, password, confirm } = req.body;

      await this.signupService.registerUser(email, nickname, password, confirm);
      return res.status(201).json({ message: '회원가입을 축하드립니다.' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = SignupController;
