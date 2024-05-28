'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guilds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Guilds.init({
    remoteId: DataTypes.STRING,
    name: DataTypes.STRING,
    ownerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Guilds',
  });
  return Guilds;
};