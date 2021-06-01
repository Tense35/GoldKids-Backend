// Terceros
import { Request, Response } from "express";
import { Op } from 'sequelize';

// Propios
import { obtenerClase, validarCampoSearch } from '../helpers/v-rutas';
import Usuario from "../models/usuario";

// Función para errores
const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error search/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - search/controller'
    });
}

export const getSearch = async( req: Request, res: Response ) => 
{
    let { estado = true, limite = 10, desde = 0 } = req.query;
    let { campo, tabla, termino } = req.params;

    estado = ( estado === 'false' )? false : true;

    try 
    {
        // Obtener el modelo a utilizar
        // const Tabla = obtenerClase(tabla || 'usuarios');
        const Tabla = Usuario;

        // Validar el campo
        if ( !validarCampoSearch(tabla, campo) )
        {
            res.status(400).json
            ({
                ok: false,
                msg: 'El campo envíado no existe o no es un campo válido.'
            });
        }

        // Parseo
        limite = Number(limite);
        desde = Number(desde);

        // SQL
        const [ data, total ] = await Promise.all
        ([
            // Data
            ( estado )? await Tabla.findAll({ where: { estado: true, [campo]: { [Op.substring]: termino } }, limit: limite, offset: desde }) : await Tabla.findAll({ where: { [campo]: { [Op.substring]: termino } }, limit: limite, offset: desde }),

            // Total
            ( estado )? await Tabla.count({ where: { estado: true, [campo]: { [Op.substring]: termino } } }) : await Tabla.count({ where: { [campo]: { [Op.substring]: termino } } })
        ]);

        res.json
        ({
            ok: true,
            data,
            total
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getSearch' );
    }
}
