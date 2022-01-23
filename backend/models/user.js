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
      // define association here
      models.User.hasMany(models.Message);
      models.User.hasMany(models.Comment);
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        validate: {
          
          len: [1,45]
          ,
          is: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/i,
          notEmpty: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        validate: {
          len: [1,45],
          is: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/i,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true, // checks for email format (foo@bar.com)
          notEmpty: true, // don't allow empty strings
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 7,
          notEmpty: true, // don't allow empty strings
        },
      },
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
