'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {foreignKey: "userId"})
    }
  }
  Profile.init({
    userId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    heigth: DataTypes.INTEGER,
    weigth: DataTypes.INTEGER,
    bloodType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};