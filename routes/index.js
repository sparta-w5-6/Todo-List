const express = require("express")
const router = express.Router()

const signupRouter = require("./signup.routes")
const commentRouter = require("./comment.routes")

router.use("/signup/", signupRouter)
router.use("/comments/", commentRouter)

module.exports = router