// Terceros
import { Request, Response } from "express";

// Propios
import generarJWT from "../helpers/jwt-generator";
import { subirArchivo, actualizarArchivo } from "../helpers/subir-archivos";
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

// Obtener todos los usuarios de la base de datos
export const getUsuarios = async( req: Request, res: Response ) => 
{
    let { estado = true, limite = 40, desde = 0 } = req.query;

    estado = ( estado === 'false' )? false : true;

    try 
    {
        // Parseo
        limite = Number(limite);
        desde = Number(desde);

        // SQL
        const [ data, total ] = await Promise.all
        ([
            // Data
            ( estado )? await Usuario.findAll({ where: { estado: true }, order: [['email', 'ASC']], limit: limite, offset: desde }) : await Usuario.findAll({ limit: limite, offset: desde }),

            // Total
            await Usuario.count()
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
        sendError(error, res, 'getUsuarios' );
    }
}

// Obtener un usuario específico de la base de datos
export const getUsuario = async( req: Request, res: Response ) => 
{
    let { estado = 1 } = req.query;
    let { email } = req.params;
    email = email.toLowerCase();

    estado = ( estado === 'false' )? 0 : 1;

    try 
    {
        let data = ( estado )? await Usuario.findOne({ where: {email, estado: 1 }}) : await Usuario.findByPk( email );

        if (!data)
        {
            return res.status(404).json
            ({
                ok: true,
                data: 'No se encontró el usuario, probablemente fue eliminado.'
            });
        }

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getUsuario' );
    }
}

export const postUsuario = async( req: Request, res: Response ) => 
{
    const info = req.body;
    const archivo = req.files;
    info.email = info.email.toLowerCase();
    info.nombre = info.nombre.toLowerCase();

    try 
    {

        if ( archivo )
        {
            const imgUrl = await subirArchivo( archivo );

            if ( imgUrl )
            {
                info.imagen = imgUrl;
            }
        }
        
        const data = await Usuario.create( info );
        // @ts-ignore
        const token = await generarJWT( data.email );

        res.json
        ({
            ok: true,
            data,
            token
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postUsuario' );
    }
}

export const putUsuario = async( req: Request, res: Response ) => 
{
    const { email } = req.params;
    const info = req.body;
    const archivo = req.files;

    if ( info.nombre )
    {
        info.nombre = info.nombre.toLowerCase();
    }

    if ( info.password )
    {
        if ( info.password.length < 5)
        {
            return res.status(400).json
            ({
                ok: false,
                msg: 'El password debe de tener 5 o más caracteres'
            });
        }
    }

    try 
    {
        const usuario = await Usuario.findByPk( email );
        //@ts-ignore
        const usuarioImg = usuario.dataValues.imagen;

        if ( req.files )
        {
            //@ts-ignore
            info.imagen = ( usuarioImg )? await actualizarArchivo( req.files, usuarioImg ) : await subirArchivo( req.files );
        }

        const data = ( usuario )? await usuario.update(info) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'putUsuario' );
    }
}

export const deleteUsuario = async( req: Request, res: Response ) => 
{
    const { email } = req.params;

    try 
    {
        const usuario = await Usuario.findByPk( email );
        const data = ( usuario )? await usuario.update({ estado: 0 }) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'deleteUsuario' );
    }
}