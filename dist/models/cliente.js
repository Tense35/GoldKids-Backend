"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../db/connection"));
// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
var Cliente = connection_1.default.define('Cliente', {
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    tipo_id: {
        type: sequelize_1.DataTypes.ENUM('cc', 'ti'),
        validate: {
            notEmpty: {
                msg: 'El tipo de documento es obligatorio'
            }
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'El nombre es obligatorio'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isEmail: {
                msg: 'El email proporcionado no es un email válido.'
            },
            notEmpty: {
                msg: 'Debe ingresar un email'
            }
        }
    },
    celular: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'El celular es obligatorio'
            }
        }
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Cliente;
//# sourceMappingURL=cliente.js.map