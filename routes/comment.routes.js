const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:todoId', authMiddleware, commentController.createComment);
router.get('/', commentController.findAllComment);
router.put('/:commentId',authMiddleware, commentController.updateComment);
router.delete('/:commentId',authMiddleware, commentController.deleteComment);

module.exports = router;