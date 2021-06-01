// Terceros
import { Request, Response } from "express";

// Propios
import Producto from '../models/producto';
import { actualizarArchivo, subirArchivo } from '../helpers/subir-archivos';

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
        msg: 'Avisar al administrador del backend - categorias/controller'
    });
}

// Obtener todos los productos de la base de datos
export const getProductos = async( req: Request, res: Response ) => 
{
    let { estado = true, descuento, stock, destacado } = req.query;

    const destacar = ( destacado === 'false' )? 0 : 1;
    
    try 
    {
        let where: any = { };
        
        if ( estado !== 'false' )
        {
            where.estado = true;
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

        const data = await Producto.findAll({ where });

        let i = 0;
        const test = data.forEach( elemento => 
        {
            console.log('-----------------------------------');
            console.log('-----------------------------------');
            console.log('-----------------------------------');
            const desc = elemento.getDataValue('descuento');
            const iva = elemento.getDataValue('iva');
            const precio = elemento.getDataValue('precio');
            const total = precio - ((precio*desc)/100) - ((precio*iva)/100);

            console.log( elemento );
            console.log('-----------------------------------');
            console.log('-----------------------------------');
            console.log('-----------------------------------');
        } )

        console.log(test);

        res.json
        ({
            ok: true,
            data
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