const express = require("express")
const router = express.Router()

const CommentController = require("../controllers/comment.controller")
const commentController = new CommentController()

router.post("/:todoId", commentController.createComment)

module.exports = router
