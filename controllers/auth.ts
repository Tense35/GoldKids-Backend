// Terceros
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

// Propios
import generarJWT from "../helpers/jwt-generator";
import Usuario from '../models/usuario';

// Función para errores

const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error usuarios/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - usuarios/controller'
    });
}

export const postLogin = async( req: Request, res: Response ) => 
{
    const { email, password } = req.body;

    try 
    {
        const usuario = await Usuario.findByPk(email);

        // @ts-ignore
        if ( password !== usuario.password )
        {
            return res.status(401).json
            ({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        const token = await generarJWT( email );

        res.json
        ({
            ok: true,
            token
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postLogin' );
    }
}

export const getRenew = async( req: Request, res: Response ) => 
{
    // @ts-ignore
    const data = req.usuario;
    const email = data.email;
    delete data.dataValues.password;

    try 
    {
        const token = await generarJWT( email );

        res.json
        ({
            ok: true,
            token,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postLogin' );
    }
}
