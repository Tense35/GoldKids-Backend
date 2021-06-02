"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../db/connection"));
// Propios
var producto_1 = __importDefault(require("./producto"));
var venta_1 = __importDefault(require("./venta"));
// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
var Detalle_Venta = connection_1.default.define('Detalle_Venta', {
    id_venta: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: {
                msg: 'El id del producto es obligatorio.'
            }
        }
    },
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: {
                msg: 'El id del producto es obligatorio.'
            }
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    createdAt: false,
    updatedAt: false,
});
Detalle_Venta.belongsTo(venta_1.default, { foreignKey: 'FK1_Detalle_Venta', targetKey: 'id_venta' });
Detalle_Venta.belongsTo(producto_1.default, { foreignKey: 'FK2_Detalle_Venta', targetKey: 'id_producto' });
exports.default = Detalle_Venta;
//# sourceMappingURL=detalle_venta.js.map