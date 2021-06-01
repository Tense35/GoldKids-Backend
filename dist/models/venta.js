"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../db/connection"));
// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
var Venta = connection_1.default.define('Venta', {
    id_venta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: {
                msg: 'El id del cliente es obligatorio.'
            }
        }
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'La dirección es obligatoria.'
            }
        }
    },
    metodo: {
        type: sequelize_1.DataTypes.ENUM('CARD', 'NEQUI', 'PSE', 'BANCOLOMBIA_TRANSFER', 'BANCOLOMBIA_COLLECT'),
        validate: {
            notEmpty: {
                msg: 'El método de pago es obligatorio.'
            }
        }
    },
    transaccion: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED'),
        defaultValue: 'PENDING'
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Venta;
//# sourceMappingURL=venta.js.map