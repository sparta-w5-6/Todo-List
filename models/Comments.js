"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: "userId" });
      this.belongsTo(models.Todos, { foreignKey: "todoId" });
    }
  }
  Comments.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Users 테이블에
          key: "userId", // userId column 과 관계를 맺음
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      todoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Todos", // Todos 테이블에
          key: "todoId", // todoId column 과 관계를 맺음
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
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
      modelName: "Comments",
    }
  );
  return Comments;
};
