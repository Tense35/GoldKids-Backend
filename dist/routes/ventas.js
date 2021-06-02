"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var ventas_1 = require("../controllers/ventas");
// Helpers y middlewares
var dbv_cliente_1 = require("../helpers/dbv-cliente");
var validar_campos_1 = require("../middlewares/validar-campos");
var dbv_venta_1 = require("../helpers/dbv-venta");
// Rutas
router.get('/', ventas_1.getVentas);
router.get('/:id_venta', [
    express_validator_1.check('id_venta').custom(dbv_venta_1.ventaNoExiste),
    validar_campos_1.validarCampos
], ventas_1.getVentas);
router.post('/', [
    express_validator_1.check('id_cliente').custom(dbv_cliente_1.clienteNoExiste),
    express_validator_1.check('direccion', 'La dirección es obligatoria').notEmpty(),
    express_validator_1.check('metodo').custom(dbv_venta_1.validarMetodo),
    express_validator_1.check('transaccion').custom(dbv_venta_1.validarTransaccion),
    validar_campos_1.validarCampos
], ventas_1.postVenta);
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
exports.default = router;
//# sourceMappingURL=ventas.js.map