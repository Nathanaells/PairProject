'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthRecordActivity extends Model {
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