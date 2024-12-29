'use strict';

const defaultInventory = { 
  items: [],
  upgrades: {
      pointscap: 0,
      gambacap: 0,
  }
}

const defaultBlackjack = {
  gameState: 0,
  wager: 0,
  hands: {
      dealer: [],
      user: [],
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      remoteId: {
        type: Sequelize.STRING,
        unique: true,
      },
      points: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true,
        defaultValue: 100,
      },
      trust: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100
      },
      inventory: {
        type: Sequelize.STRING(9999),
        allowNull: true,
        defaultValue: JSON.stringify(defaultInventory)
      },
      blackjack: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        defaultValue: JSON.stringify(defaultBlackjack)
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
    await queryInterface.dropTable('Users');
  }
};