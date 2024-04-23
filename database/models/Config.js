const db = require('../index');
const { Model, DataTypes } = require('sequelize');

class Config extends Model {
    static associate () {

    }
}

Config.init(
    {
        guildId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        plexChannel: {
            type: DataTypes.INTEGER,
            unique: false
        },
        plexOwner: {
            type: DataTypes.INTEGER,
            unique: false
        },
        APODChannel: {
            type: DataTypes.INTEGER,
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