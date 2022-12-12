"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Todo, { foreignKey: "userId" })
      // this.hasMany(models.Comments, { foreignKey: "userId" })
      // this.hasMany(models.Likes, { foreignKey: "userId" })
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      nickname: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  )
  return Users
}
