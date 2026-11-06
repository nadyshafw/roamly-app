'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.Trip, { foreignKey: 'tripId' })
    }
  }
  Activity.init({
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Trip required!"
        },
        notNull: {
          msg: "Trip required!"
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
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Day required!"
        }, 
        notNull: {
          msg: "Day required!"
        }
      }
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Note required!"
        },
        notEmpty: {
          msg: "Note required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};