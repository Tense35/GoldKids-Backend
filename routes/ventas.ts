// Terceros
import { Router } from 'express';
import { check } from 'express-validator'
const router = Router();

// Controladores
import { getVentas, postVenta } from '../controllers/ventas';

// Helpers y middlewares
import { clienteNoExiste } from '../helpers/dbv-cliente';
import { validarCampos } from '../middlewares/validar-campos';
import { validarMetodo, validarTransaccion, ventaNoExiste } from '../helpers/dbv-venta';

// Rutas

router.get('/', getVentas); 

router.get('/:id_venta',
[
    check('id_venta').custom( ventaNoExiste ),
    validarCampos
], getVentas);

router.post('/',
[
    check('id_cliente').custom( clienteNoExiste ),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('metodo').custom( validarMetodo ),
    check('transaccion').custom( validarTransaccion ),
    validarCampos
], postVenta);

// router.put('/:id_venta',
// [
//     check('id_venta').custom( ventaNoExiste ),
//     validarCampos
// ], putUsuario);

// router.delete('/:email',
// [
//     check('email', 'El email proporcionado no es un email válido').isEmail(),
//     validarCampos,
//     check('email').custom( emailNoExiste ),
//     validarCampos
// ], deleteUsuario);

export default router;