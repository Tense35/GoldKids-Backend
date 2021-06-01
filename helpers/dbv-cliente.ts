import Cliente from "../models/cliente";


export const clienteExiste = async( id_cliente: number ) => 
{
    const existeCliente = await Cliente.findByPk( id_cliente );

    if ( existeCliente )
    {
        throw new Error(`El cliente con id ${ id_cliente } ya se encuentra registrado en la base de datos`);
    }
}

export const clienteNoExiste = async( id_cliente: number ) => 
{
    const existeCliente = await Cliente.findByPk( id_cliente );

    if ( !existeCliente )
    {
        throw new Error(`El cliente con id: ${ id_cliente }, no está registrado en la base de datos`);
    }
}
