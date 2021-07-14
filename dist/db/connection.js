"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// RemoteMysql
// const dbName = process.env.DB_NAME || '';
// const password = process.env.DB_PASS || '';
// CleverCloud
var dbName = process.env.DB_NAME_CLEVER || '';
var dbUser = process.env.DB_USER_CLEVER || '';
var password = process.env.DB_PASS_CLEVER || '';
// Parámetros: DbName, User, Contraseña, Confg - RemoteMysql
// const db = new Sequelize(dbName, dbName, password, 
// {
//     host: 'remotemysql.com',
//     dialect: 'mysql',
//     //logging: false
// });
// Parámetros: DbName, User, Contraseña, Confg - Clever-Cloud
var db = new sequelize_1.Sequelize(dbName, dbUser, password, {
    host: 'bstsjjetowfafkf7fcrq-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    //logging: false
});
//logging: Si está en false, dejará de mostrar las consultas que haga a la db en la consola
exports.default = db;
//# sourceMappingURL=connection.js.map