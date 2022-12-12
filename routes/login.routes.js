const express = require("express")
const router = express.Router()

const LoginController = require("../controllers/signup.controller")
const loginController = new LoginController()

router.post("/", loginController.login)

module.exports = router
