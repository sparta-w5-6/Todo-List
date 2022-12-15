const CommentRepository = require('../repositories/comment.repository');

const { TodoRepository } = require('../repositories/todo.repository');

const { Comments, Todos } = require('../models');

class CommentService {
  commentRepository = new CommentRepository(Comments);
  todoRepository = new TodoRepository(Todos);

  createComment = async (comment, userId, todoId) => {
    if (!comment) {
      throw new Error('comment 내용을 적어주세요.');
    }

    const todo = this.todoRepository.findTodoList(todoId);
    if (!todo) {
      throw new Error('게시글이 없습니다.');
    }

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

  findAllComment = async () => {
    const findAllComment = await this.commentRepository.findAllComment();
    findAllComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return findAllComment;
  };

  updateComment = async (commentId, user, comment) => {
    const isComment = await this.commentRepository.findOneComment(commentId);

    if (isComment.userId !== user.userId) {
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
    return {
      commentId: updateComment.commentId,
      userId: updateComment.userId,
      comment: updateComment.comment,
      editCheck: 'true',
      createdAt: updateComment.createdAt,
      updatedAt: updateComment.updatedAt,
    };
  };

  deleteComment = async (commentId) => {
    const isComment = await this.commentRepository.findOneComment(commentId);
    if (!isComment) {
      throw new Error('댓글이 없습니다.');
    }
    const result = await this.commentRepository.deleteComment(commentId);
    return result;
  };
}

module.exports = CommentService;