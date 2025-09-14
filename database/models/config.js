'use strict';

import { Model } from 'sequelize';

const Config = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Config.init({
    guildId: DataTypes.STRING,
    plexChannel: DataTypes.STRING,
    plexOwner: DataTypes.STRING,
    APODChannel: DataTypes.STRING,
    botModerators: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Config',
  });
  return Config;
};

export default Config;