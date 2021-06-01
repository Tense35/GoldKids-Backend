import Usuario from "../models/usuario"


export const emailExiste = async( email: string ) => 
{
    const existeEmail = await Usuario.findByPk( email );

    if ( existeEmail )
    {
        throw new Error(`El email ${ email } ya se encuentra registrado en la base de datos`);
    }
}

export const emailNoExiste = async( email: string ) => 
{
    const existeEmail = await Usuario.findByPk( email );

    if ( !existeEmail )
    {
        throw new Error(`El email ${ email } no está registrado en la base de datos`);
    }
}
