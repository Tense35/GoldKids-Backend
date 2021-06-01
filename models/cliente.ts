import { DataTypes } from "sequelize";
import db from "../db/connection";

// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
const Cliente = db.define('Cliente', 
{
    id_cliente: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    tipo_id:
    {
        type: DataTypes.ENUM('cc', 'ti'),
        validate: 
        {
            notEmpty:
            {
                msg: 'El tipo de documento es obligatorio'                    
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
                msg: 'El nombre es obligatorio'                        
            }
        }
    },
    email: 
    {
        type: DataTypes.STRING,
        validate:
        {
            isEmail: 
            {
                msg: 'El email proporcionado no es un email válido.'
            },
            notEmpty:
            {
                msg: 'Debe ingresar un email'
            }
        }
    },
    celular:
    {
        type: DataTypes.STRING,
        validate: 
        {
            notEmpty:
            {
                msg: 'El celular es obligatorio'                        
            }
        }
    },
    estado: 
    {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},
{
    createdAt: false,
    updatedAt: false
});

export default Cliente;