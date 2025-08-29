'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guildId: {
        type: Sequelize.STRING,
        unique: true,
      },
      plexChannel: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      plexOwner: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      APODChannel: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      botModerators: {
        type: Sequelize.JSON,
        defaultValue: JSON.stringify({"null":"null"}),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Configs');
  }
};