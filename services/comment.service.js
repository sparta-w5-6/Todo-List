const CommentRepository = require('../repositories/comment.repository');

class CommentService {
  commentRepository = new CommentRepository();

  createComment = async (comment, userId, todoId) => {
    // 댓글 내용이 존재하는지 체크
    if (!comment) {
      throw new Error('comment 내용을 적어주세요.');
    }

    /**
     * TODO TodoList 기능개발 완료 후 TodoRepository에서 findOne으로 Todo게시글 가져와서
     * 존재 여부 확인할 것
     * 게시글이 존재하는지 체크
        if (temp) {
          throw new Error('게시글이 없습니다.');
        }
     */

    const createComment = await this.commentRepository.createComment(
      comment,
      userId,
      todoId,
    );
    console.log('createComment', createComment);

    return {
      commentId: createComment.commentId,
      userId: createComment.userId,
      comment: createComment.comment,
      editCheck: 'false',
      createdAt: createComment.createdAt,
      updatedAt: createComment.updatedAt,
    };
  };

  findAllComment = async ({}) => {
    const findAllComment = await this.commentRepository.findAllComment({});
    findAllComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return findAllComment;
  };

  updateComment = async (commentId, user, comment) => {
    const isComment = await this.commentRepository.findOneComment(commentId);

    if (isComment.commentId !== user.userId) {
      throw new Error('댓글이 없습니다.');
    }

    if (comment === '') {
      throw new Error('빈칸을 채워주세요');
    }

    const updateComment = await this.commentRepository.updateComment(
      commentId,
      comment,
    );

    if (!updateComment) {
      throw new Error('게시글이 없습니다.');
    }
    return updateComment;
  };
}

module.exports = CommentService;
