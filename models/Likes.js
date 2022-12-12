<<<<<<< HEAD
'use strict';
const { Model } = require('sequelize');
=======
"use strict";
const { Model } = require("sequelize");
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Todos, { foreignKey: 'todoId' });
=======
      this.belongsTo(models.Users, { foreignKey: "userId" });
      this.belongsTo(models.Todos, { foreignKey: "todoId" });
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
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
<<<<<<< HEAD
        references: { model: 'Todos', key: 'todoId' },
        onDelete: 'CASCADE',
=======
        references: { model: "Todos", key: "todoId" },
        onDelete: "CASCADE",
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
      },

      userId: {
        type: DataTypes.INTEGER,
<<<<<<< HEAD
        references: { model: 'Users', key: 'userId' },
        onDelete: 'CASCADE',
      },

=======
        references: { model: "Users", key: "userId" },
        onDelete: "CASCADE",
      },
      isLike: {
        type: DataTypes.BOOLEAN,
      },
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
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
<<<<<<< HEAD
      modelName: 'Likes',
=======
      modelName: "Likes",
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
    }
  );
  return Likes;
};
