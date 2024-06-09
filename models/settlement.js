"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Settlement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Settlement.belongsTo(models.User, {
        as: "FromUser",
        foreignKey: "fromUserId",
      });
      Settlement.belongsTo(models.User, {
        as: "ToUser",
        foreignKey: "toUserId",
      });
    }
  }
  Settlement.init(
    {
      amount: DataTypes.FLOAT,
      status: DataTypes.STRING,
      fromUserId: DataTypes.INTEGER,
      toUserId: DataTypes.INTEGER,
      lastUpdatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Settlement",
    }
  );

  return Settlement;
};
