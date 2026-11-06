'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Trip, { foreignKey: 'userId' })
    }
  }
  User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "username required!"
          },
          notNull: {
            msg: "username required!"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is be unique"
        },
        validate: {
          notEmpty: {
            msg: "Email required!"
          },
          notNull: {
            msg: "Email required!"
          },
          isEmail: {
            msg: "Invalid format email"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password required!"
          },
          notNull: {
            msg: "Password required!"
          }
        }
      },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPass(user.password)
  })
  return User;
};