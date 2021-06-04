// Terceros
import { DataTypes } from "sequelize";
import db from "../db/connection";

// Propios
import Categoria from "./categoria";

// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
const Producto = db.define('Producto', 
{
    id_producto: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categoria: 
    {
        type: DataTypes.INTEGER 
    },
    color: 
    {
        type: DataTypes.STRING,
        validate:
        {
            notEmpty: 
            {
                msg:'El color del producto es obligatorio.'
            }
        }
    },
    talla: 
    {
        type: DataTypes.STRING,
        validate:
        {
            notEmpty: 
            {
                msg:'La talla del producto es obligatorio.'
            }
        }
    },
    nombre: 
    {
        type: DataTypes.STRING,
        validate:
        {
            notEmpty: 
            {
                msg:'El nombre del producto es obligatorio.'
            }
        }
    },
    genero: 
    {
        type: DataTypes.ENUM('m', 'f', 'x'),
        validate: 
        {
            notEmpty:
            {
                msg: 'El género debe ser masculino (m), femenino (f) o unisex (x) y es obligatorio'                    
            }
        }
    },
    precio: 
    {
        type: DataTypes.FLOAT,
        validate:
        {
            notEmpty: 
            {
                msg:'El precio del producto es obligatorio.'
            }
        }
    },
    descripcion: 
    {
        type: DataTypes.STRING,
        validate:
        {
            notEmpty: 
            {
                msg:'La descripción del producto es obligatoria.'
            }
        }
    },
    imagen: 
    {
        type: DataTypes.STRING,
        defaultValue: 'https://res.cloudinary.com/dm1464giy/image/upload/v1622577586/noimage.jpg'
    },
    iva: 
    {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    destacar: 
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    descuento: 
    {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    stock: 
    {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    estado: 
    {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    }
},
{
    createdAt: false,
    updatedAt: false
});

// Añadir asosiación con la clave foránea
Producto.hasMany(Categoria, { foreignKey: { field: 'id_categoria' } });

export default Producto;