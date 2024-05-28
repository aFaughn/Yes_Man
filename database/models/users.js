'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    username: DataTypes.STRING,
    remoteId: DataTypes.STRING,
    points: DataTypes.BIGINT,
    trust: DataTypes.INTEGER,
    inventory: DataTypes.STRING,
    blackjack: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};