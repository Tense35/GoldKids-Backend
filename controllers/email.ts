// Terceros
import { Request, Response } from "express";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: 'linuxmtasa@hotmail.com',
        pass: 'LinuxMTA'
    }
});

// Función para errores
const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error email/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - email/controller'
    });
}

export const postEmail = async( req: Request, res: Response ) => 
{
    const { to, text } = req.body;

    console.log('-------------');
    console.log(req.body);
    console.log('-------------');

    try 
    {
        const mailOptions = 
        {
            from: 'linuxmtasa@hotmail.com',
            to,
            subject: 'Información - GoldKids | No responder',
            text
        }

        console.log(mailOptions);

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
        sendError(error, res, 'postEmail' );
    }
}
