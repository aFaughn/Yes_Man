const db = require(`../index`);
const {Model, DataTypes} = require('sequelize');

class Counter extends Model {
    static associate() {

    }
}

Counter.init(
    {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        value: {
            type: DataTypes.INTEGER,
            unique: false
        }
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: 'Counter'
    }
)