'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Counters', [
      {
      name: 'hardly',
      value: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        name: 'mom',
        value: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Counters', {
      name: { [Op.in]: ['hardly', 'mom']}
    }, {});
  }
};
