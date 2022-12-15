import { Model } from 'sequelize';
const { Likes } = require('../models');

export class LikeRepository {
  public async getLike(todoId: number, userId: number): Promise<unknown> {
    return Likes.findOne({ where: { todoId, userId } });
  };

  public async getLikeCount(todoId: number): Promise<number> {
    return Likes.count({ where: { todoId, isLike: true } });
  };

  public async createLike(todoId: number, userId: number, isLike: boolean): Promise<unknown> {
    const like = await this.getLike(todoId, userId);

    if (like) {
      throw new Error('DUPLICATED_LIKE');
    }

    return Likes.create({ todoId, userId, isLike });
  };

  public async updateLike(todoId: number, userId: number, isLike: boolean): Promise<unknown> {
    const like = <Model & { isLike: boolean, updatedAt: Date }>(await this.getLike(todoId, userId));

    if (!like) {
      throw new Error('NO_EXISTS_LIKE');
    }

    like.isLike = isLike;
    like.updatedAt = new Date();

    return like.save();
  };

  public async toggleLike(todoId: number, userId: number): Promise<unknown> {
    const like = <Model & { isLike: boolean, updatedAt: Date }>(await this.getLike(todoId, userId));

    if (!like) {
      return this.createLike(todoId, userId, true);
    }

    return this.updateLike(todoId, userId, !like.isLike);
  };
}