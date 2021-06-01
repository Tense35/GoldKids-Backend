import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validarCampos = ( req: Request, res: Response, next: NextFunction ) => 
{
    let errors = validationResult( req );
    if (!errors.isEmpty())
    {
        const msg = errors['errors'][0].msg;
        return res.status(400).json
        ({
            ok: false,
            msg
        });
    }

    next();
}