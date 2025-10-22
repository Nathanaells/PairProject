'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthRecordActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  HealthRecordActivity.init({
    healthRecordId: DataTypes.INTEGER,
    activityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HealthRecordActivity',
  });
  return HealthRecordActivity;
};