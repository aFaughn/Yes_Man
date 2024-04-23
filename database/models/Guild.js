const db = require('../index');
const { Model, DataTypes } = require('sequelize');

class Guild extends Model {
    static associate() {

    }
}

Guild.init(
    {
        remoteId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            unique: false
        },
        ownerName: {
            type: DataTypes.STRING,
            unique: false
        },
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'Guild'
    }
)

module.exports = Guild;