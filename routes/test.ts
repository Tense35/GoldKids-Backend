// Terceros
import { Router } from 'express';
import { check } from 'express-validator';
const router = Router();

// Controladores
import { postTest } from '../controllers/tests';
import { clienteNoExiste } from '../helpers/dbv-cliente';

// Helpers y middlewares
import { validarCampos } from '../middlewares/validar-campos';

// Ruta para ejecución de pruebas

router.post('/', 
[
    check('to', 'El destinatario es obligatorio').notEmpty(),
    check('text', 'El texto es obligatorio').notEmpty(),
    validarCampos
], postTest);

export default router;