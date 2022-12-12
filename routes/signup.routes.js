const express = require("express")
const router = express.Router()

// PostsController 모듈 가져오기
const SignupController = require("../controllers/signup.controller")
//최초로 가져왔던 모듈에 대한 클래스를 실제로 선언한다.
const signupController = new SignupController()

// get 또는 post 메소드로 기본url 을 전달받으면 PostsController 의 get, create 메소드를 사용하겠다.
router.post("/", signupController.registerUser)

module.exports = router
