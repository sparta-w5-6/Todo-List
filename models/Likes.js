<<<<<<< HEAD
<<<<<<< HEAD
'use strict';
const { Model } = require('sequelize');
=======
"use strict";
const { Model } = require("sequelize");
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
=======
'use strict';
const { Model } = require('sequelize');
>>>>>>> c3d22248075c2a5b7e7676391b5fb0b78109b4c4
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
<<<<<<< HEAD
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Todos, { foreignKey: 'todoId' });
=======
      this.belongsTo(models.Users, { foreignKey: "userId" });
      this.belongsTo(models.Todos, { foreignKey: "todoId" });
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
=======
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Todos, { foreignKey: 'todoId' });
>>>>>>> c3d22248075c2a5b7e7676391b5fb0b78109b4c4
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
<<<<<<< HEAD
        references: { model: 'Todos', key: 'todoId' },
        onDelete: 'CASCADE',
=======
        references: { model: "Todos", key: "todoId" },
        onDelete: "CASCADE",
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
=======
        references: { model: 'Todos', key: 'todoId' },
        onDelete: 'CASCADE',
>>>>>>> c3d22248075c2a5b7e7676391b5fb0b78109b4c4
      },

      userId: {
        type: DataTypes.INTEGER,
<<<<<<< HEAD
<<<<<<< HEAD
        references: { model: 'Users', key: 'userId' },
        onDelete: 'CASCADE',
      },

=======
        references: { model: "Users", key: "userId" },
        onDelete: "CASCADE",
=======
        references: { model: 'Users', key: 'userId' },
        onDelete: 'CASCADE',
>>>>>>> c3d22248075c2a5b7e7676391b5fb0b78109b4c4
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
<<<<<<< HEAD
      modelName: 'Likes',
=======
      modelName: "Likes",
>>>>>>> aaad9181de403a00f693bd6beff862f3987176fc
    }
=======
      modelName: 'Likes',
    },
>>>>>>> c3d22248075c2a5b7e7676391b5fb0b78109b4c4
  );
  return Likes;
};
