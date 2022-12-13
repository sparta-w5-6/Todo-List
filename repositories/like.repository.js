const { Likes } = require('../models');

class LikeRepository {
  getLike = async (todoId, userId) => {
    return Likes.findOne({ where: { todoId, userId } });
  };

  getLikeCount = async (todoId) => {
    return Likes.count({ where: { todoId, isLike: true } });
  };

  createLike = async (todoId, userId, isLike) => {
    const like = await this.getLike(todoId, userId);

    if (like) {
      throw new Error('DUPLICATED_LIKE');
    }

    return Likes.create({ todoId, userId, isLike });
  };

  updateLike = async (todoId, userId, isLike) => {
    const like = await this.getLike(todoId, userId);

    if (!like) {
      throw new Error('NO_EXISTS_LIKE');
    }

    like.isLike = isLike;
    like.updatedAt = new Date();

    return like.save();
  };

  toggleLike = async (todoId, userId) => {
    const like = await this.getLike(todoId, userId);

    if (!like) {
      return this.createLike(todoId, userId, true);
    }

    return this.updateLike(todoId, userId, !like.isLike);
  };
}

module.exports = LikeRepository;
