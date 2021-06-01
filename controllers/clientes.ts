// Terceros
import { Request, Response } from "express";

// Propios
import Cliente from '../models/cliente';

// Función para errores

const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error clientes/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - clientes/controller'
    });
}

// Obtener todos los clientes de la base de datos
export const getClientes = async( req: Request, res: Response ) => 
{
    let { estado = true } = req.query;

    estado = ( estado === 'false' )? false : true;

    try 
    {
        const data = ( estado )? await Cliente.findAll({ where: { estado: true } }) : await Cliente.findAll();

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getClientes' );
    }
}

// Obtener un cliente específico de la base de datos
export const getCliente = async( req: Request, res: Response ) => 
{
    let { estado = 1 } = req.query;
    let { id_cliente } = req.params;
    id_cliente = id_cliente.toLowerCase();

    estado = ( estado === 'false' )? 0 : 1;

    try 
    {
        let data = ( estado )? await Cliente.findOne({ where: {id_cliente, estado: 1 }}) : await Cliente.findByPk( id_cliente );

        if (!data)
        {
            return res.status(404).json
            ({
                ok: true,
                data: 'No se encontró el cliente, probablemente fue eliminado.'
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
        sendError(error, res, 'getCliente' );
    }
}

export const postCliente = async( req: Request, res: Response ) => 
{
    const info = req.body;
    info.nombre = info.nombre.toLowerCase();
    info.tipo_id = info.tipo_id.toLowerCase();
    info.email = info.email.toLowerCase();

    try 
    {
        // Validar si el cliente ya está creado
        const cliente = await Cliente.findByPk( info.id_cliente );

        if ( cliente )
        {
            info.estado = true;
            const data = ( cliente )? await cliente.update(info) : null;

            return res.json
            ({
                ok: true,
                msg: 'Se ha actualizado la información del cliente',
                data
            });
        }


        const data = await Cliente.create( info );

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postCliente' );
    }
}

export const putCliente = async( req: Request, res: Response ) => 
{
    const { id_cliente } = req.params;
    const info = req.body;

    if ( info.email )
    {
        info.email = info.email.toLowerCase();
    }

    if ( info.tipo_id )
    {
        info.tipo_id = info.tipo_id.toLowerCase();
    }

    if ( info.nombre )
    {
        info.nombre = info.nombre.toLowerCase();
    }

    try 
    {

        
        
        const cliente = await Cliente.findByPk( id_cliente );
        
        const data = ( cliente )? await cliente.update(info) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'putCliente' );
    }
}

export const deleteCliente = async( req: Request, res: Response ) => 
{
    const { id_cliente } = req.params;

    try 
    {
        const cliente = await Cliente.findByPk( id_cliente );
        const data = ( cliente )? await cliente.update({ estado: 0 }) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'deleteCliente' );
    }
}