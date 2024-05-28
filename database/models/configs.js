'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Configs.init({
    guildId: DataTypes.STRING,
    plexChannel: DataTypes.STRING,
    plexOwner: DataTypes.STRING,
    APODChannel: DataTypes.STRING,
    botModerators: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Configs',
  });
  return Configs;
};