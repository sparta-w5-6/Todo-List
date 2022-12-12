const { Comments } = require("../models");

class CommentRepository {

  createComment = async (comment, userId, todoId) => {
    const createComment = await Comments.create({ comment, userId, todoId });
    return createComment;
  };
}

module.exports = CommentRepository;
