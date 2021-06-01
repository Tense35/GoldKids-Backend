import { Rutas } from '../constant/rutas.constant';
import Producto from '../models/producto';
import Usuario from '../models/usuario';
import Cliente from '../models/cliente';
import Categoria from '../models/categoria';

const rutas = new Rutas();

export const rutaNoExiste = async(tabla: string ) => 
{
    if ( !rutas.rutasValidas.includes( tabla ) )
    {
        throw new Error(`La ruta ${ tabla } no existe o no es permitida. Rutas permitidas: ${ rutas.rutasValidas }`);
    }
}

// @ts-ignore
export const obtenerClase = ( tabla: string ) =>
{
    console.log('Función clase');
    switch ( tabla.toLowerCase() ) 
    {
        case 'usuarios':
            return Usuario;
        break;

        case 'categorias':
            return Categoria;
        break;

        case 'clientes':
            return Cliente;
        break;

        case 'productos':
            return Producto;
        break;
    
        default:
            return Usuario;
        break;
    }
}

export const validarCampoSearch = ( tabla: string, campo: string) => 
{
    switch ( tabla.toLowerCase() ) 
    {
        case 'usuarios':
            if ( rutas.camposUsuario.includes(campo.toLowerCase()) )
            {
                return true;
            }
        break;

        // case 'categorias':
        //     return Categoria;
        // break;

        // case 'clientes':
        //     return Cliente;
        // break;

        // case 'productos':
        //     return Producto;
        // break;
    
        default:
            return false
        break;
    }
}
