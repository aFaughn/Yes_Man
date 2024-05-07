const db = require('../index');
const { Model, DataTypes } = require('sequelize');

class Config extends Model {
    static associate () {

    }
}

Config.init(
    {
        guildId: {
            type: DataTypes.STRING,
            unique: true
        },
        plexChannel: {
            type: DataTypes.STRING,
            unique: false
        },
        plexOwner: {
            type: DataTypes.STRING,
            unique: false
        },
        APODChannel: {
            type: DataTypes.STRING,
            unique: false
        },
        botModerators: {
            type: DataTypes.JSON,
            unique: false
        },
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'Config'
    }
)

module.exports = Config;