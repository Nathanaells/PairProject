"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HealthRecord extends Model {
    static associate(models) {
      HealthRecord.belongsTo(models.User, { foreignKey: "userId" });
      HealthRecord.belongsToMany(models.Activity, {
        through: models.HealthRecordActivity,
        foreignKey: "healthRecordId",
      });
    }
    get setDate() {
      return new Date(this.date).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    get setSugarLevel() {
      return `${this.sugarLevel} mg/dL`;
    }

    get setBloodPressure() {
      return `${this.bloodPressure} mmHg`;
    }
  }
  HealthRecord.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date Required",
          },
          isBefore: {
            args: new Date(),
            msg: "date cannot be later than the current date",
          },
        },
      },
      bloodPressure: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "BloodPressure required",
          },
          notEmpty: {
            msg: "BloodPressure required",
          },
          min: {
            args: 50,
            msg: "Blood Pressure Minimal is 50",
          },
        },
      },
      sugarLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Sugar Level required",
          },
          notEmpty: {
            msg: "Sugar Level required",
          },
          min: {
            args: 50,
            msg: "Sugar Level Minimal is 50",
          },
        },
      },
      note: {
        type: DataTypes.TEXT,
        defaultValue: "Tidak Ada Catatan",
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HealthRecord",
    }
  );

  return HealthRecord;
};
