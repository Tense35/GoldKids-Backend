// Terceros
import { Router } from 'express';
import { check } from 'express-validator'
const router = Router();

// Controladores
import { getRenew, postLogin } from '../controllers/auth';

// Helpers y middlewares
import { emailNoExiste } from '../helpers/dbv-usuario';
import { validarCampos } from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

// Rutas

// Logearse
router.post('/',
[
    check('email', 'El email es obligatorio y debe ser un email válido').isEmail(),
    validarCampos,
    check('email').custom( emailNoExiste ),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], postLogin);

// Renovar un Token
router.get('/renew',
[
    validarJWT,
    validarCampos
], getRenew);

export default router;