"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Settlement, {
        as: "FromSettlements",
        foreignKey: "fromUserId",
      });
      User.hasMany(models.Settlement, {
        as: "ToSettlements",
        foreignKey: "toUserId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      fullname: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
