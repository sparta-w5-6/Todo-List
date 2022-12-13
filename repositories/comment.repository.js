const { Comments } = require('../models');

class CommentRepository {
  constructor(model) {
    this.Comments = model;
  }

  createComment = async (comment, userId, todoId) => {
    const createComment = await Comments.create({ comment, userId, todoId });
    return createComment;
  };

  findAllComment = async ({}) => {
    const findAllComment = await Comments.findAll({});
    return findAllComment;
  };

  findOneComment = async (commentId) => {
    const findOneComment = await Comments.findOne({ where: { commentId } });
    return findOneComment;
  };

  updateComment = async (commentId, comment) => {
    const updateComment = await Comments.update(
      { comment },
      { where: { commentId } },
    );
    return updateComment;
  };

  deleteComment = async (commentId) => {
    const deleteComment = await Comments.destroy({
      where: { commentId },
    });
    return deleteComment;
  };
}

module.exports = CommentRepository;
