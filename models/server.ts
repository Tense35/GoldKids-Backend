// Terceros
import cors from "cors";
import express, { Application } from "express";
import fileUpload from "express-fileupload";

// Propios
import db from "../db/connection";

// Rutas
import authRoutes from '../routes/auth';
import categoriasRoutes from '../routes/categorias';
import clientesRoutes from '../routes/clientes';
import productosRoutes from '../routes/productos';
import searchRoutes from '../routes/search';
import usuariosRoutes from '../routes/usuarios';

class Server 
{

    // Propieades
    private app: Application;
    private port: string;

    // Definición de endpoints
    private paths =
    {
        auth: '/api/auth',
        categorias: '/api/categorias',
        clientes: '/api/clientes',
        productos: '/api/productos',
        search: '/api/search',
        usuarios: '/api/usuarios',
        ventas: '/api/ventas'
    };

    constructor()
    {
        this.app = express();
        this.port = process.env.PORT || '8081';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // Establecer conexión con la base de datos
    async dbConnection()
    {
        try 
        {
            await db.authenticate();
            console.log('Database online');
        } 
        catch (error) 
        {
            throw new Error( error );
        }
    }

    middlewares()
    {
        // Cors
        this.app.use( cors() );

        // Lectura del body - Permite leer el body de las peticiones rest
        this.app.use( express.json() );

        // Carpeta pública - Carpeta inicial en el navegador
        this.app.use( express.static('public'));

        // Permitir subir archivo mediante el API REST
        this.app.use
        (
            fileUpload
            ({
                useTempFiles : true,
                tempFileDir : '/tmp/'
            })
        );
    }

    // Definición de rutas
    routes()
    {
        this.app.use( this.paths.auth, authRoutes );
        this.app.use( this.paths.categorias, categoriasRoutes );
        this.app.use( this.paths.clientes, clientesRoutes );
        this.app.use( this.paths.productos, productosRoutes );
        this.app.use( this.paths.search, searchRoutes );
        this.app.use( this.paths.usuarios, usuariosRoutes );
    }

    // Levantar el servidor
    listen(): void
    {
        this.app.listen( this.port, () => 
        {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

// Exportar la clase
export default Server;