import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

// RemoteMysql
// const dbName = process.env.DB_NAME || '';
// const password = process.env.DB_PASS || '';

// CleverCloud
const dbName = process.env.DB_NAME_CLEVER || '';
const dbUser = process.env.DB_USER_CLEVER || '';
const password = process.env.DB_PASS_CLEVER || '';

// Parámetros: DbName, User, Contraseña, Confg - RemoteMysql
// const db = new Sequelize(dbName, dbName, password, 
// {
//     host: 'remotemysql.com',
//     dialect: 'mysql',
//     //logging: false
// });

// Parámetros: DbName, User, Contraseña, Confg - Clever-Cloud
const db = new Sequelize(dbName, dbUser, password, 
{
    host: 'bstsjjetowfafkf7fcrq-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    //logging: false
});

//logging: Si está en false, dejará de mostrar las consultas que haga a la db en la consola

export default db;