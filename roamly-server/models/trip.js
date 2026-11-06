'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(models.User, { foreignKey: 'userId' })
      Trip.hasMany(models.Activity, { foreignKey: 'tripId' })
    }

  }
  Trip.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User required!"
        },
        notNull: {
          msg: "User required!"
        }
      }
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Destination required!"
        },
        notNull: {
          msg: "Destination required!"
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title required!"
        },
        notNull: {
          msg: "Title required!"
        }
      }
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Days required!"
        },
        notNull: {
          msg: "Days required!"
        }
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Start Date required!"
        },
        notNull: {
          msg: "Start Date required!"
        }
      }
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Budget required!"
        },
        notNull: {
          msg: "Budget required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};