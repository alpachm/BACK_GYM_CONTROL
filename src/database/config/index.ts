import { Sequelize } from "sequelize";
import 'dotenv/config';

const db = new Sequelize({
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
    host: process.env.DB_HOST as string,
    database: process.env.DB_DATABASE as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    logging: false
});

export default db;
