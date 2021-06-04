// Terceros
import { Request, Response } from "express";

// Propios
import { actualizarArchivo, subirArchivo } from '../helpers/subir-archivos';
import Producto from '../models/producto';
import Categoria from '../models/categoria';

// Función para errores

const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error productos/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - productos/controller'
    });
}

// Obtener todos los productos de la base de datos
export const getProductos = async( req: Request, res: Response ) => 
{
    let { estado = true, descuento, stock, destacado, categoria } = req.query;

    const destacar = ( destacado === 'false' )? 0 : 1;
    
    try 
    {
        let where: any = { };
        
        if ( estado !== 'false' )
        {
            where.estado = true;
        }

        if ( categoria && categoria !== 'false')
        {
            where.id_categoria = categoria;
        }

        if ( descuento )
        {
            where.descuento = descuento;
        }

        if ( stock )
        {
            where.stock = stock;
        }

        if ( destacado )
        {
            where.destacar = destacar;
        }

        const [ data, total ] = await Promise.all
        ([
            // Data
            await (await Producto.findAll({ where, include: { model: Categoria, attributes: ['nombre'] } })).map( ( resp: any ) => 
            {
                resp.dataValues.precioFinal = (resp.precio - ((resp.precio*resp.descuento)/100) + ((resp.precio*resp.iva)/100));
                return resp;
            }),

            // Total
            await Producto.count({ where })
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
        sendError(error, res, 'getProductos' );
    }
}

// Obtener un producto específico de la base de datos
export const getProducto = async( req: Request, res: Response ) => 
{
    let { estado = 1 } = req.query;
    let { id_producto } = req.params;

    estado = ( estado === 'false' )? 0 : 1;

    try 
    {
        let data = ( estado )? await Producto.findOne({ where: {id_producto, estado: 1 }}) : await Producto.findByPk( id_producto );

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
        sendError(error, res, 'getProducto' );
    }
}

export const postProducto = async( req: Request, res: Response ) => 
{
    const info = req.body;
    const archivo = req.files;

    info.color = info.color.toLowerCase();
    info.talla = info.talla.toLowerCase();
    info.nombre = info.nombre.toLowerCase();
    info.genero = info.genero.toLowerCase();
    info.descripcion = info.descripcion.toLowerCase();

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

        const data = await Producto.create( info );

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postProducto' );
    }
}

export const putProducto = async( req: Request, res: Response ) => 
{
    const { id_producto } = req.params;
    const info = req.body;

    const archivo = req.files;

    if ( info.color )
    {
        info.color = info.color.toLowerCase();
    }

    if ( info.talla )
    {
        info.talla = info.talla.toLowerCase();
    }

    if ( info.nombre )
    {
        info.nombre = info.nombre.toLowerCase();
    }

    if ( info.enero )
    {
        info.genero = info.genero.toLowerCase();
    }

    if ( info.descripcion )
    {
        info.descripcion = info.descripcion.toLowerCase();
    }

    try 
    {
        const producto: any = await Producto.findByPk( id_producto );
        const productoImg = producto.dataValues.imagen;

        if ( req.files )
        {
            info.imagen = ( productoImg )? await actualizarArchivo( req.files, productoImg ) : await subirArchivo( req.files );
        }

        const data = ( producto )? await producto.update(info) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'putProducto' );
    }
}

export const deleteProducto = async( req: Request, res: Response ) => 
{
    const { id_producto } = req.params;

    try 
    {
        const producto = await Producto.findByPk( id_producto );
        const data = ( producto )? await producto.update({ estado: 0 }) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'deleteProducto' );
    }
}