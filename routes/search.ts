// Terceros
import { Router } from 'express';
import { check } from 'express-validator';
const router = Router();

// Controladores
import { getSearch } from '../controllers/search';

// Helpers y middlewares
import { rutaNoExiste } from '../helpers/v-rutas';
import { validarCampos } from '../middlewares/validar-campos';


// Rutas

// Obtener un producto | !query: estado=false
router.get('/:tabla/:campo/:termino',
[
    check('tabla').custom( rutaNoExiste ),
    check('campo', 'El campo es obligatorio').notEmpty(),
    check('termino', 'El término es obligatorio').notEmpty(),
    validarCampos
], getSearch);

export default router;