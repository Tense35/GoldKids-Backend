import jwt from 'jsonwebtoken';

const generarJWT = ( email = '' ) => 
{
    return new Promise(( resolve, reject ) => 
    {
        const payload = { email };

        jwt.sign( payload, process.env.JWT_KEY || '', { expiresIn: '24h' },
        ( err, token ) => 
        {
            if (err)
            {
                console.log(err);
                reject( 'No se pudo generar el token' );
            }
            else
            {
                resolve( token );
            }
        })

    });
}

export default generarJWT;