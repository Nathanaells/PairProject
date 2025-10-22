'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HealthRecord.belongsTo(models.User, {foreignKey: "userId"});
      HealthRecord.belongsToMany(models.Activity, {through: models.HealthRecordActivity, foreignKey: "activityId"})

    }
  }
  HealthRecord.init({
    date: DataTypes.DATE,
    bloodPressure: DataTypes.INTEGER,
    sugarLevel: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    qrCodeUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HealthRecord',
  });
  return HealthRecord;
};