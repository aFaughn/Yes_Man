require('dotenv').config()
const {Sequelize} = require('sequelize');

console.log(process.env.SEQUELIZE_LOGGING)

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: `postgres`,
    logging: process.env.SEQUELIZE_LOGGING === 'true' ? true : false,
});


module.exports = sequelize;