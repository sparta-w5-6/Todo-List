const SignupService = require("../services/signup.service.js")

class SignupController {
  signupService = new SignupService()

  registerUser = async (req, res, next) => {
    try {
      const { email, nickname, password, confirm } = req.body

      if (password !== confirm) throw Error("패스워드가 패스워드 확인란과 동일하지 않습니다.")
      await this.signupService.registerUser(email, nickname, password)
      return res.status(201).json({ message: "회원가입을 축하드립니다." })
    } catch (error) {
      console.log(error)
      console.log(1)
      res.status(400).json({ errorMessage: error.message })
    }
  }
}

module.exports = SignupController
