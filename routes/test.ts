// Terceros
import { Router } from 'express';
import { check } from 'express-validator';
const router = Router();

// Controladores
import { getTest } from '../controllers/tests';
import { clienteNoExiste } from '../helpers/dbv-cliente';

// Helpers y middlewares
import { validarCampos } from '../middlewares/validar-campos';

// Ruta para ejecución de pruebas

router.get('/', 
[
    // check('id_usuario').custom( clienteNoExiste ),
    // validarCampos
] ,getTest);

export default router;