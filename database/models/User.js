const db = require(`../index`);
const {Model, DataTypes} = require('sequelize');

const defaultInventory = { 
    items: [],
    upgrades: {
        pointscap: 0,
        gambacap: 0,
    }
}

const defaultBlackjack = {
    gameState: 0,
    wager: 0,
    hands: {
        dealer: [],
        user: [],
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
        remoteId: {
            type: DataTypes.STRING,
            unique: true
        },
        points: {
            type: DataTypes.FLOAT,
            unique: false,
            allowNull: true,
            defaultValue: 100,
        },
        trust: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        inventory: {
            type: DataTypes.STRING(9999),
            allowNull: true,
            defaultValue: JSON.stringify(defaultInventory)
        },
        blackjack: {
            type: DataTypes.STRING(2000),
            allowNull: true,
            defaultValue: JSON.stringify(defaultBlackjack)
        }
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'User'
    }
    )

module.exports = User;