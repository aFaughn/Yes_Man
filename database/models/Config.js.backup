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
            unique: false,
            defaultValue: '',
        },
        plexOwner: {
            type: DataTypes.STRING,
            unique: false,
            defaultValue: '',
        },
        APODChannel: {
            type: DataTypes.STRING,
            unique: false,
            defaultValue: '',
        },
        botModerators: {
            type: DataTypes.JSON,
            unique: false,
            defaultValue: '',
        },
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'Config'
    }
)

module.exports = Config;