const CommentService = require("../services/comment.service");

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { userId } = res.locals.user;
    const { todoId } = req.params;

    if (!comment) {
      return res
        .status(412)
        .json({ errorMessage: "댓글 내용을 입력해 주세요" });
    }

    const createComment = await this.commentService.createComment(
      comment,
      userId,
      todoId
    );

    return res
      .status(200)
      .json({ message: "댓글을 생성하였습니다.", result: createComment });
  };
}

module.exports = CommentController;
