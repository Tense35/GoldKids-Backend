"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../db/connection"));
// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
var Usuario = connection_1.default.define('Usuario', {
    email: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
        validate: {
            isEmail: {
                msg: 'El email proporcionado no es un email válido.'
            },
            notEmpty: {
                msg: 'Debe ingresar un email'
            }
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'https://res.cloudinary.com/tense/image/upload/v1621928936/noimage.jpg'
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map