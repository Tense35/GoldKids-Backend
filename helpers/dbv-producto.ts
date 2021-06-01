import Producto from "../models/producto"

export const productoExiste = async( id_producto: number ) => 
{
    const existeProducto = await Producto.findByPk( id_producto );

    if ( existeProducto )
    {
        throw new Error(`El producto con id ${ id_producto } ya se encuentra registrado en la base de datos`);
    }
}

export const productoNoExiste = async( id_producto: number ) => 
{
    const existeProducto = await Producto.findByPk( id_producto );

    if ( !existeProducto )
    {
        throw new Error(`El producto con id: ${ id_producto }, no está registrado en la base de datos`)
    }
}
