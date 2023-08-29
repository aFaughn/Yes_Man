const { DefaultWebSocketManagerOptions } = require('discord.js');
const db = require(`../index`);
const {Model, DataTypes} = require('sequelize');

class User extends Model {
    static associate() {

    }
}

User.init(
    {
        discordSnowflake: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'User'
    }
    )