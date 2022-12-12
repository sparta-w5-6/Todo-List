const LoginController = require('./login.controller');

class LogoutController {
  loginController = new LoginController();
  logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    console.log(1);
    return res.status(200).json({ message: '로그아웃 되었습니다.' });
  };
}

module.exports = LogoutController;
