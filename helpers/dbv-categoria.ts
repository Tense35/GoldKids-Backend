import Categoria from "../models/categoria"


export const categoriaExiste = async( id_categoria: number ) => 
{
    const existeCategoria = await Categoria.findByPk( id_categoria );

    if ( existeCategoria )
    {
        throw new Error(`La categoría con id ${ id_categoria } ya se encuentra registrada en la base de datos`);
    }
}

export const categoriaNoExiste = async( id_categoria: number ) => 
{
    const existeCategoria = await Categoria.findByPk( id_categoria );

    if ( !existeCategoria )
    {
        throw new Error(`La categoría con id: ${ id_categoria }, no está registrada en la base de datos`)
    }
}
