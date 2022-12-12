const CommentRepository = require('../repositories/comment.repository');

class CommentService {
  commentRepository = new CommentRepository();

  createComment = async (comment, userId, todoId) => {
    // 댓글 내용이 존재하는지 체크
    if (!comment) {
      throw new Error('comment 내용을 적어주세요.');
    }

    // 게시글이 존재하는지 체크
    if (!todoId) {
      throw new Error('게시글이 없습니다.');
    }

    const createComment = await this.commentRepository.createComment(
      comment,
      userId,
      todoId,
    );
    console.log("createComment", createComment);

    return {
      commentId: createComment.commentId,
      userId: createComment.userId,
      comment: createComment.comment,
      editCheck: 'false',
      createdAt: createComment.createdAt,
      updatedAt: createComment.updatedAt,
    };
  };

  findAllComment = async () => {
    const findAllComment = await this.commentRepository.findAllComment({});
    findAllComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return findAllComment;
  };

  updateComment = async (commentId, comment) => {};
}

module.exports = CommentService;
