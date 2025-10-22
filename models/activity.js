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
      Activity.belongsToMany(models.HealthRecord, {through: models.HealthRecordActivity, foreignKey: " healthRecordId"})
   
    }
  }
  Activity.init({
    name: DataTypes.STRING,
    caloriesBurned: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};