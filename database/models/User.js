const db = require(`../index`);
const {Model, DataTypes} = require('sequelize');

const defaultInventory = { 
    items: [],
    upgrades: {
        pointscap: 0,
        gambacap: 0,
    }
}

class User extends Model {
    static associate() {

    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        points: {
            type: DataTypes.FLOAT,
            unique: false,
            allowNull: true,
            defaultValue: 100,
        },
        favoriteGame: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        karma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        inventory: {
            type: DataTypes.STRING(9999),
            allowNull: true,
            defaultValue: JSON.stringify(defaultInventory)
        }
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'User'
    }
    )

module.exports = User;