// Terceros
import { Request, Response } from "express";
import { Op } from 'sequelize';
import { clienteNoExiste } from "../helpers/dbv-cliente";

// Propios
import Usuario from "../models/usuario";

// Función para errores
const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error test/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - test/controller'
    });
}

export const getTest = async( req: Request, res: Response ) => 
{
    const info = req.body;

    try 
    {
        const test = await clienteNoExiste(info.id_cliente).catch( error => 
        {
            return console.log (error);
        })

        console.log('----------------------');
        console.log('         TEST         ');
        console.log('----------------------');
        console.log('----------------------');
        console.log('----------------------');

        res.json
        ({
            ok: true,
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getSearch' );
    }
}
