// Terceros
import { Request, Response } from "express";

// Propios
import { clienteNoExiste } from "../helpers/dbv-cliente";
import { productoNoExiste } from "../helpers/dbv-producto";
import Venta from '../models/venta';

// Función para errores

const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error ventas/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - categorias/controller'
    });
}

// Listados
const metodos: string[] = ['CARD', 'NEQUI', 'PSE', 'BANCOLOMBIA_TRANSFER', 'BANCOLOMBIA_COLLECT'];
const transacciones: string[] = ['PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED'];


// Obtener todas las ventas de la base de datos
export const getVentas = async( req: Request, res: Response ) => 
{
    let { estado = true, id_producto, id_cliente, metodo, transaccion, total } = req.query;

    try 
    {
        let where: any = { };
        
        if ( estado !== 'false' )
        {
            where.estado = true;
        }

        if ( id_producto )
        {
            if ( productoNoExiste(Number(id_producto)) )
            {
                where.id_producto = Number(id_producto);
            }
        }

        if ( id_cliente )
        {
            if ( clienteNoExiste(Number(id_cliente)) )
            {
                where.id_cliente = Number(id_cliente);
            }
        }

        if ( metodo )
        {
            if ( metodos.includes( String(metodo) ) )
            {
                where.metodo = String(metodo);
            }
        }

        if ( transaccion )
        {
            if ( transacciones.includes( String(transaccion) ) )
            {
                where.transaccion = String(transaccion);
            }
        }

        if ( total )
        {
            where.total = Number(total);
        }

        const data = await Venta.findAll({ where });

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getVentas' );
    }
}

// Obtener una venta específica de la base de datos
export const getVenta = async( req: Request, res: Response ) => 
{
    let { estado = 1 } = req.query;
    const { id_venta } = req.params;

    estado = ( estado === 'false' )? 0 : 1;

    try 
    {
        let data = ( estado )? await Venta.findOne({ where: {id_venta, estado: 1 }}) : await Venta.findByPk( id_venta );

        if (!data)
        {
            return res.status(404).json
            ({
                ok: true,
                data: 'No se encontró la venta, probablemente fue eliminada.'
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
        sendError(error, res, 'getVenta' );
    }
}

export const postVenta = async( req: Request, res: Response ) => 
{
    const info = req.body;
    info.direccion = info.direccion.toLowerCase();
    info.metodo = info.metodo.toUpperCase();
    info.transaccion = info.transaccion.toUpperCase();

    try 
    {
        const data = await Venta.create( info );

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postVenta' );
    }
}

export const putVenta = async( req: Request, res: Response ) => 
{
    const { email } = req.params;
    const info = req.body;

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
        const venta = await Venta.findByPk( email );
        const data = ( venta )? await venta.update(info) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'putVenta' );
    }
}

export const deleteVenta = async( req: Request, res: Response ) => 
{
    const { email } = req.params;

    try 
    {
        const venta = await Venta.findByPk( email );
        const data = ( venta )? await venta.update({ estado: 0 }) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'deleteVenta' );
    }
}