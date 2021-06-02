// Terceros
import { DataTypes } from "sequelize";
import db from "../db/connection";

// Propios
import Producto from "./producto";
import Venta from './venta';

// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
const Detalle_Venta = db.define('Detalle_Venta', 
{
    id_venta: 
    {
        type: DataTypes.INTEGER,
        validate:
        {
            notEmpty: 
            {
                msg:'El id del producto es obligatorio.'
            }
        }
    },
    id_producto: 
    {
        type: DataTypes.INTEGER,
        validate:
        {
            notEmpty: 
            {
                msg:'El id del producto es obligatorio.'
            }
        }
    },
    cantidad: 
    {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},
{
    createdAt: false,
    updatedAt: false,
});

Detalle_Venta.belongsTo(Venta, { foreignKey: 'FK1_Detalle_Venta', targetKey: 'id_venta' });
Detalle_Venta.belongsTo(Producto, { foreignKey: 'FK2_Detalle_Venta', targetKey: 'id_producto' });

export default Detalle_Venta;