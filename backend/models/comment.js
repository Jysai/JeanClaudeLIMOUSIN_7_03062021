"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      models.User.belongsToMany(models.Message, {
        through: models.Comment,
        foreignKey: 'id',
        otherKey  : 'messageId'
      });
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });

    }
  }
  Comment.init(
    {
     
      messageId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: {
        type: DataTypes.STRING,
        validate: {
          min: 1,
          
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
