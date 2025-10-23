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
      Activity.belongsToMany(models.HealthRecord, {through: models.HealthRecordActivity, foreignKey: "activityId"})
   
    }
  }
  Activity.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Activity Required"
        },
        notNull: {
          msg: "Activity Required"
        }
      }
    },
    caloriesBurned:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Calories Burned Required"
        },
        notNull: {
          msg: "Calories Burned Required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};