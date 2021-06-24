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

    get camposProducto()
    {
        return ['id_producto', 'id_categoria', 'color', 'talla', 'nombre', 'genero', 'precio', 'descripcion', 'iva', 'destacar', 'descuento', 'stock', 'estado'];
    }

    constructor()
    {
        
    }

}