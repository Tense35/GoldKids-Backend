import { DataTypes } from "sequelize";
import db from "../db/connection";

// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
const Usuario = db.define('Usuario', 
{
    email: 
    {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
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
    nombre: 
    {
        type: DataTypes.STRING
    },
    password: 
    {
        type: DataTypes.STRING
    },
    imagen: 
    {
        type: DataTypes.STRING,
        defaultValue: 'https://res.cloudinary.com/tense/image/upload/v1621928936/noimage.jpg'
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

export default Usuario;