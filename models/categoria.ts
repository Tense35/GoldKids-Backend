import { DataTypes } from "sequelize";
import db from "../db/connection";

// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
const Categoria = db.define('Categorias', 
{
    id_categoria: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: 
    {
        type: DataTypes.STRING,
        validate: 
        {
            notEmpty: true
        }
    },
    descripcion: 
    {
        type: DataTypes.STRING
    },
    estado: 
    {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    createdAt: false,
    updatedAt: false
});

export default Categoria;