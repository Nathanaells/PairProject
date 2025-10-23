'use strict';
const fs = require('fs').promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const data = JSON.parse(await fs.readFile('./data/activities.json', 'utf8')).map(el => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert("Activities", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Activities', null, {});
  }
};
