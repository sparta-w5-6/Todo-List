const SignupService = require("../services/signup.service.js")
const { Users } = require("../models/index")
const { Op } = require("sequelize")

class SignupController {
  signupService = new SignupService()

  registerUser = async (req, res, next) => {
    try {
      const { email, nickname, password, confirm } = req.body
      const emailValidate = email.split("@") // 이메일 형식 확인
      const existUser = await Users.findAll({ where: { [Op.or]: [{ email }, { nickname }] } })
      if (password !== confirm) throw Error("패스워드가 패스워드 확인란과 동일하지 않습니다.")
      if (emailValidate.length !== 2 || email[0] === "@" || email[email.length - 1] === "@") throw Error("이메일의 형식이 올바르지 않습니다.")
      else if (existUser.length) throw Error("이미 가입된 아이디 입니다.")
      else if (password.length <= 3) throw Error("비밀번호는 4글자 이상이어야 합니다.")
      else {
        await this.signupService.registerUser(email, nickname, password)
        res.status(201).json({ message: "회원가입을 축하드립니다." })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ errorMessage: error.message })
    }
  }
}

module.exports = SignupController
