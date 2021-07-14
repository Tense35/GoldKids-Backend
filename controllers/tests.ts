// Terceros
import { Request, Response } from "express";
const nodemailer = require('nodemailer');
import { clienteNoExiste } from "../helpers/dbv-cliente";

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: 'linuxmtasa@hotmail.com',
        pass: 'LinuxMTA'
    }
});

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

export const postTest = async( req: Request, res: Response ) => 
{
    const { to, text } = req.body;

    try 
    {
        const mailOptions = 
        {
            from: 'GoldKids@hotmail.com',
            to,
            subject: 'Correo de prueba - GoldKids',
            text
        }

        transporter.sendMail(mailOptions, (error: any, info: any) =>
        {
            console.log(info);
            if (error)
            {
                console.log(error);
            }
        });

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
