import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.DB_HOST || 'host.docker.internal',
    dialect: `postgres`,
    logging: process.env.SEQUELIZE_LOGGING === 'false' ? false : true,
});

