'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Profiles", {
      fields: ['userId'],
      type: 'foreign key',
      name: "custom_fkey_constraint_userId-on-Profiles",
      references: {
        table: "Users",
        field: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
  });

      await queryInterface.addConstraint("HealthRecords", {
      fields: ['userId'],
      type: 'foreign key',
      name: "custom_fkey_constraint_userId-on-HR",
      references: {
        table: "Users",
        field: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
  });

    await queryInterface.addConstraint("HealthRecordActivities", {
      fields: ["healthRecordId"],
      type: "foreign key",
      name: "custom_fkey_constraint_healthRecordId-on-HealthRecordActivities",
      references: {
        table: "HealthRecords",
        field : "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    })

    await queryInterface.addConstraint("HealthRecordActivities", {
      fields: ["activityId"],
      type: "foreign key",
      name: "custom_fkey_constraint_activityId-on-HealthRecordActivities",
      references: {
        table: "Activities",
        field: "id"
      }
    })
},

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeConstraint("Profiles", "custom_fkey_constraint_userId-on-Profiles")
    await queryInterface.removeConstraint("HealthRecords", "custom_fkey_constraint_userId-on-HR")
    await queryInterface.removeConstraint("HealthRecordActivities", "custom_fkey_constraint_healthRecordId-on-HealthRecordActivities")
    await queryInterface.removeConstraint("HealthRecordActivities", "custom_fkey_constraint_activityId-on-HealthRecordActivities")
    


  }
};
