"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Profile.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Age Required",
          },
          notNull: {
            msg: "Age Required",
          },
          min: {
            args: 1,
            msg: "Age Minimal is 1",
          },
        },
      },
      heigth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Heigth Required",
          },
          notNull: {
            msg: "Heigth Required",
          },
        },
      },
      weigth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Weigth Required",
          },
          notNull: {
            msg: "Weigth Required",
          },
          min: {
            args: 1,
            msg: "Weigth Minimal is 1",
          },
        },
      },

      bloodType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Blood Type Required"
          },
          notNull: {
            msg: "Blood Type Required"
          }
        }
      }
    },

    {
      sequelize,
      modelName: "Profile",
    }
  );

  return Profile;
};
