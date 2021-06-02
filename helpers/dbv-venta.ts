import Venta from "../models/venta";
import Wompi from '../constant/metodos.constant';

const api = new Wompi();

export const ventaExiste = async( id_venta: number ) => 
{
    const existeVenta = await Venta.findByPk( id_venta );

    if ( existeVenta )
    {
        throw new Error(`La venta con id ${ id_venta } ya se encuentra registrada en la base de datos`);
    }
}

export const ventaNoExiste = async( id_venta: number ) => 
{
    const VentaCategoria = await Venta.findByPk( id_venta );

    if ( !VentaCategoria )
    {
        throw new Error(`La venta con id: ${ id_venta }, no está registrada en la base de datos`);
    }
}

export const validarMetodo = async( metodo: string ) => 
{
    if ( !api.apiMetodosValidos.includes(metodo.toUpperCase()) )
    {
        throw new Error(`El método de pago: ${ metodo }, no es un método de pago válido.`);
    }
}

export const validarTransaccion = async( transaccion: string ) => 
{
    if ( !api.apiTransaccionEstado.includes(transaccion.toUpperCase()) )
    {
        throw new Error(`El estado de transacción: ${ transaccion }, no es un estado válido.`);
    }
}
