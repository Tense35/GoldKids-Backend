// Terceros
const cloudinary = require('cloudinary').v2;
import { Archivo } from '../interfaces/Archivo.interface';

cloudinary.config( process.env.CLOUDINARY_URL );

const obtenerExtension = ( archivo: Archivo ):string => 
{
    const nombreCortado = archivo.name.split('.');
    return nombreCortado[ nombreCortado.length-1 ];
}

export const subirArchivo = async( files: any, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']) =>
{
    let url:string = 'Empty';
    try
    {
        // Obtener el path temporal del archivo enviado
        const { tempFilePath } = files.archivo;

        // Guardar el archivo en Cloudinary y almacenar el nombre del archivo
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        
        if ( secure_url )
        {
            url = secure_url;
        }

    }
    catch ( msg )
    {
        console.log(msg);
        console.log('Error Catch - subirArchivo/Helper');
    }

    return new Promise( (resolve, reject) =>
    {
        const { archivo } = files;

        try
        {
            // Obtener la extensión
            const extension = obtenerExtension( archivo );

            // Validar la extensión
            if ( !extensionesValidas.includes( extension ))
            {
                return reject(`La extensión ${ extension }, no es una extensión válida, ${ extensionesValidas }`);
            }
            resolve( url );
        }
        catch ( msg )
        {
            reject ( null );
        }
    });
}

export const actualizarArchivo = async( files: any, imagenUrl: string, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']) =>
{
    try 
    {

        const noImageUrl = "https://res.cloudinary.com/tense/image/upload/v1621928936/noimage.jpg";

        if (imagenUrl !== "noimage.jpg" && imagenUrl !== noImageUrl)
        {
            const fraccionar = imagenUrl.split('/');
            const idImagen = fraccionar[ fraccionar.length - 1 ];
            const [ public_id ] = idImagen.split('.');
            await cloudinary.uploader.destroy( public_id );
            console.log(public_id);
        }

        return await subirArchivo( files, extensionesValidas );
    } 
    catch (error) 
    {
        console.log(error);
        return null;
    }
}
