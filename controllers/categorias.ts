// Terceros
import { Request, Response } from "express";

// Propios
import Categoria from '../models/categoria';

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

// Obtener todas las categorias de la base de datos
export const getCategorias = async( req: Request, res: Response ) => 
{
    let { estado = true } = req.query;

    estado = ( estado === 'false' )? false : true;

    try 
    {
        const data = ( estado )? await Categoria.findAll({ where: { estado: true } }) : await Categoria.findAll();

        console.log(data);
        // @ts-ignore
        delete data?.dataValues.ProductoIdProducto;

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getCategorias' );
    }
}

// Obtener una categoria específica de la base de datos
export const getCategoria = async( req: Request, res: Response ) => 
{
    let { estado = 1 } = req.query;
    let { id_categoria } = req.params;

    estado = ( estado === 'false' )? 0 : 1;

    try 
    {
        let data = ( estado )? await Categoria.findOne({ where: {id_categoria, estado: 1 }}) : await Categoria.findByPk( id_categoria );

        if (!data)
        {
            return res.status(404).json
            ({
                ok: true,
                data: 'No se encontró la categoría, probablemente fue eliminado.'
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
        sendError(error, res, 'getCategoria' );
    }
}

export const postCategoria = async( req: Request, res: Response ) => 
{
    const { id_categoria, ...info } = req.body;
    info.nombre = info.nombre.toLowerCase();

    if ( info.descripcion )
    {
        info.descripcion = info.descripcion.toLowerCase();
    }

    try 
    {
        const data = await Categoria.create( info );

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postCategoria' );
    }
}

export const putCategoria = async( req: Request, res: Response ) => 
{
    const { id_categoria } = req.params;
    const info = req.body;

    if ( info.nombre )
    {
        info.nombre = info.nombre.toLowerCase();
    }

    if ( info.descripcion )
    {
        info.descripcion = info.descripcion.toLowerCase();
    }

    try 
    {
        const categoria = await Categoria.findByPk( id_categoria );
        const data = ( categoria )? await categoria.update(info) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'putCategoria' );
    }
}

export const deleteCategoria = async( req: Request, res: Response ) => 
{
    const { id_categoria } = req.params;

    try 
    {
        const categoria = await Categoria.findByPk( id_categoria );
        const data = ( categoria )? await categoria.update({ estado: 0 }) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'deleteCategoria' );
    }
}