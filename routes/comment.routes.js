const express = require("express")
const router = express.Router()

const CommentController = require("../controllers/comment.controller")
const commentController = new CommentController()

router.post("/:todoId", commentController.createComment)
router.get("/", commentController.findAllComment)

module.exports = router
