"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var dbName = process.env.DB_NAME || '';
var password = process.env.DB_PASS || '';
// Parámetros: DbName, User, Contraseña, Confg
var db = new sequelize_1.Sequelize(dbName, dbName, password, {
    host: 'remotemysql.com',
    dialect: 'mysql',
    //logging: false
});
//logging: Si está en false, dejará de mostrar las consultas que haga a la db en la consola
exports.default = db;
//# sourceMappingURL=connection.js.map