class CommentRepository {
  constructor(CommentsModel) {
    this.commentsModel = CommentsModel;
  }

  createComment = async (comment, userId, todoId) => {
    const createComment = await this.commentsModel.create({
      comment,
      userId,
      todoId,
    });
    return createComment;
  };

  findAllComment = async () => {
    const findAllComment = await this.commentsModel.findAll({});
    return findAllComment;
  };

  findOneComment = async (commentId) => {
    const findOneComment = await this.commentsModel.findOne({
      where: { commentId },
    });
    return findOneComment;
  };

  updateComment = async (commentId, comment) => {
    const updateComment = await this.commentsModel.update(
      { comment },
      { where: { commentId } },
    );
    console.log('updateComment',updateComment)
    return updateComment;
  };

  deleteComment = async (commentId) => {
    const deleteComment = await this.commentsModel.destroy({
      where: { commentId },
    });
    return deleteComment;
  };
}

module.exports = CommentRepository;
