'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    remoteId: DataTypes.STRING,
    points: DataTypes.INTEGER,
    trust: DataTypes.INTEGER,
    inventory: DataTypes.STRING,
    blackjack: DataTypes.STRING,
    fishingXP: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};