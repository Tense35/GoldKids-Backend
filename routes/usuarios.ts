// Terceros
import { Router } from 'express';
import { check } from 'express-validator'
const router = Router();

// Controladores
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuarios';

// Helpers y middlewares
import { emailExiste, emailNoExiste } from '../helpers/dbv-usuario';
import { validarCampos } from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

// Rutas

// Obtener todos los usuarios | !query: estado=false
router.get('/', getUsuarios); 

// Obtener un usuario | !query: estado=false
router.get('/:email',
[
    check('email', 'El email proporcionado no es un email válido').isEmail(),
    check('email').custom( emailNoExiste ),
    validarCampos
], getUsuario);

// Crear un usuario
router.post('/',
[
    check('email', 'El email es obligatorio').notEmpty(),
    validarCampos,
    check('email', 'El email proporcionado no es un email válido').isEmail(),
    validarCampos,
    check('email').custom( emailExiste ),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contraseña es obliatoria y debe contener mínimo 5 caracteres').isLength({ min: 5, max: undefined }),
    validarCampos
], postUsuario);

router.put('/:email',
[
    check('email', 'El email proporcionado no es un email válido').isEmail(),
    validarCampos,
    check('email').custom( emailNoExiste ),
    validarCampos
], putUsuario);

router.delete('/:email',
[
    check('email', 'El email proporcionado no es un email válido').isEmail(),
    validarCampos,
    check('email').custom( emailNoExiste ),
    validarCampos
], deleteUsuario);

export default router;