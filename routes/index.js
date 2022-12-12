const express = require("express")
const router = express.Router()

const signupRouter = require("./signup.routes")
const loginRouter = require("./login.routes")
const logoutRouter = require("./logout.routes")

router.use("/signup/", signupRouter)
router.use("/login/", loginRouter)
router.use("/logout/", logoutRouter)

module.exports = router
