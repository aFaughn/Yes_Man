require('dotenv').config()
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: `postgres`,
    logging: process.env.SEQUELIZE_LOGGING === 'false' ? false : true,
});


module.exports = sequelize;