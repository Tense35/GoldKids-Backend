// Terceros
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

// Propios
import Usuario from '../models/usuario';

const validarJWT = async( req:Request, res:Response, next: any ) => 
{
    const token = req.header('x-token');
    const key = process.env.JWT_KEY || "error";

    // Validar que envíen el token

    if( !token )
    {
        return res.status(401).json
        ({
            msg: 'No hay token en la petición'
        });
    }

    try 
    {
        // @ts-ignore
        const { email } = jwt.verify( token, key );

        // Leer el usuario que corresponde al email del token
        const usuario = await Usuario.findByPk( email );

        // Verificar que el usuario no esté vacío

        if ( !usuario )
        {
            return res.status(401).json 
            ({
                ok: false,
                msg: 'Token no válido - usuario no existe en DB'
            });
        }

        // Verificar si el usuario tiene estado en true

        // @ts-ignore
        if ( !usuario.estado )
        {
            return res.status(401).json 
            ({
                ok: false,
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        // @ts-ignore
        req.usuario = usuario;

        next();
    } 
    catch ( error ) 
    {
        console.log( error );
        return res.status(401).json
        ({
            ok: false,
            msg: 'Token no válido - catch'
        });
    }

}

export default validarJWT;