export class Rutas 
{

    get rutasValidas()
    {
        return  ['usuarios', 'categorias', 'productos', 'clientes', 'ventas'];
    }

    get camposUsuario()
    {
        return ['email', 'nombre'];
    }

    constructor()
    {
        
    }

}