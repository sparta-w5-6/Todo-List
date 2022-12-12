const { json } = require('sequelize');
const CommentService = require('../services/comment.service');

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { userId } = res.locals.user;
    const { todoId } = req.params;

    if (!comment) {
      return res
        .status(412)
        .json({ errorMessage: '댓글 내용을 입력해 주세요' });
    }

    try {
      const createComment = await this.commentService.createComment(
        comment,
        userId,
        todoId,
      );

      return res
        .status(200)
        .json({ message: '댓글을 생성하였습니다.', result: createComment });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };

  findAllComment = async (req, res, next) => {
    try {
      const findAllComment = await this.commentService.findAllComment({});
      return res.status(200).json({ result: findAllComment });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };

  updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const { commentId } = req.params;
    const user = res.locals.user;

    try {
      await this.commentService.updateComment(commentId, user, comment);

      return res.status(200).json({ message: '댓글 수정 완료' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = CommentController;
