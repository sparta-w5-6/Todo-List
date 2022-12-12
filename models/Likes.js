'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Todos, { foreignKey: 'todoId' });
    }
  }
  Likes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      todoId: {
        type: DataTypes.INTEGER,
        references: { model: 'Todos', key: 'todoId' },
        onDelete: 'CASCADE',
      },

      userId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'userId' },
        onDelete: 'CASCADE',
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Likes',
    }
  );
  return Likes;
};
