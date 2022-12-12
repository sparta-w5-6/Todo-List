const LoginService = require('../services/login.service');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const ValidationError = require('../exception/index.exception');

class LoginController {
  loginService = new LoginService();

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.loginService.findUser(email, password);
      const token = await this.loginService.login(user, password);
      res.cookie('token', token);
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      res.status(error.status || 400);
      res.json({ errorMessage: error.message });
    }
  };
}

module.exports = LoginController;
