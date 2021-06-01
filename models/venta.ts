import { DataTypes } from "sequelize";
import db from "../db/connection";

// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
const Venta = db.define('Venta', 
{
    id_venta: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: 
    {
        type: DataTypes.INTEGER,
        validate:
        {
            notEmpty: 
            {
                msg:'El id del cliente es obligatorio.'
            }
        }
    },
    direccion: 
    {
        type: DataTypes.STRING,
        validate:
        {
            notEmpty: 
            {
                msg:'La dirección es obligatoria.'
            }
        }
    },
    metodo: 
    {
        type: DataTypes.ENUM('CARD', 'NEQUI', 'PSE', 'BANCOLOMBIA_TRANSFER', 'BANCOLOMBIA_COLLECT'),
        validate:
        {
            notEmpty: 
            {
                msg:'El método de pago es obligatorio.'
            }
        }
    },
    transaccion: 
    {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED'),
        defaultValue: 'PENDING'
    },
    total: 
    {
        type: DataTypes.FLOAT
    },
    fecha: 
    {
        type: DataTypes.DATE
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

export default Venta;