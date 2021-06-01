// Terceros
import { Router } from 'express';
import { check } from 'express-validator'
const router = Router();

// Controladores
import { deleteCliente, getCliente, getClientes, postCliente, putCliente } from '../controllers/clientes';

// Helpers y middlewares
import { clienteExiste, clienteNoExiste } from '../helpers/dbv-cliente';
import { validarCampos } from '../middlewares/validar-campos';

// Rutas

// Obtener todos los clientes | !query: estado=false
router.get('/', getClientes); 

// Obtener un cliente | !query: estado=false
router.get('/:id_cliente',
[
    check('id_cliente').custom( clienteNoExiste ),
    validarCampos
], getCliente);

// Crear un cliente
router.post('/',
[
    check('id_cliente', 'La identificación del cliente es obligatoria').notEmpty(),
    validarCampos,
    check('id_cliente').custom( clienteExiste ),
    check('celular', 'El celular del cliente es obligatorio').notEmpty(),
    check('email', 'El email del cliente es obligatorio').notEmpty(),
    check('nombre', 'El nombre del cliente es obligatorio').notEmpty(),
    check('tipo_id', 'El tipo de documento es obligatorio').notEmpty(),
    validarCampos
], postCliente);

router.put('/:id_cliente',
[
    check('id_cliente').custom( clienteNoExiste ),
    validarCampos
], putCliente);

router.delete('/:id_cliente',
[
    check('id_cliente').custom( clienteNoExiste ),
    validarCampos
], deleteCliente);

export default router;