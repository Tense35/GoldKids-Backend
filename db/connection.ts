import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME || '';
const password = process.env.DB_PASS || '';

// Parámetros: DbName, User, Contraseña, Confg
const db = new Sequelize(dbName, dbName, password, 
{
    host: 'remotemysql.com',
    dialect: 'mysql',
    //logging: false
});

//logging: Si está en false, dejará de mostrar las consultas que haga a la db en la consola

export default db;