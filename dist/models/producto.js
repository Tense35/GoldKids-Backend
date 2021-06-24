"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../db/connection"));
// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
var Producto = connection_1.default.define('Producto', {
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categoria: {
        type: sequelize_1.DataTypes.INTEGER
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'El color del producto es obligatorio.'
            }
        }
    },
    talla: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'La talla del producto es obligatorio.'
            }
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'El nombre del producto es obligatorio.'
            }
        }
    },
    genero: {
        type: sequelize_1.DataTypes.ENUM('m', 'f', 'x'),
        validate: {
            notEmpty: {
                msg: 'El género debe ser masculino (m), femenino (f) o unisex (x) y es obligatorio'
            }
        }
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT,
        validate: {
            notEmpty: {
                msg: 'El precio del producto es obligatorio.'
            }
        }
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'La descripción del producto es obligatoria.'
            }
        }
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'https://res.cloudinary.com/dm1464giy/image/upload/v1622577586/noimage.jpg'
    },
    iva: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0
    },
    destacar: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    descuento: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    createdAt: false,
    updatedAt: false
});
// Añadir asosiación con la clave foránea
//Producto.hasMany(Categoria, { foreignKey: { field: 'id_categoria' } });
exports.default = Producto;
//# sourceMappingURL=producto.js.map