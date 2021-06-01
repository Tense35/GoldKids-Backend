"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var clientes_1 = require("../controllers/clientes");
// Helpers y middlewares
var dbv_cliente_1 = require("../helpers/dbv-cliente");
var validar_campos_1 = require("../middlewares/validar-campos");
// Rutas
// Obtener todos los clientes | !query: estado=false
router.get('/', clientes_1.getClientes);
// Obtener un cliente | !query: estado=false
router.get('/:id_cliente', [
    express_validator_1.check('id_cliente').custom(dbv_cliente_1.clienteNoExiste),
    validar_campos_1.validarCampos
], clientes_1.getCliente);
// Crear un cliente
router.post('/', [
    express_validator_1.check('id_cliente', 'La identificación del cliente es obligatoria').notEmpty(),
    validar_campos_1.validarCampos,
    express_validator_1.check('id_cliente').custom(dbv_cliente_1.clienteExiste),
    express_validator_1.check('celular', 'El celular del cliente es obligatorio').notEmpty(),
    express_validator_1.check('email', 'El email del cliente es obligatorio').notEmpty(),
    express_validator_1.check('nombre', 'El nombre del cliente es obligatorio').notEmpty(),
    express_validator_1.check('tipo_id', 'El tipo de documento es obligatorio').notEmpty(),
    validar_campos_1.validarCampos
], clientes_1.postCliente);
router.put('/:id_cliente', [
    express_validator_1.check('id_cliente').custom(dbv_cliente_1.clienteNoExiste),
    validar_campos_1.validarCampos
], clientes_1.putCliente);
router.delete('/:id_cliente', [
    express_validator_1.check('id_cliente').custom(dbv_cliente_1.clienteNoExiste),
    validar_campos_1.validarCampos
], clientes_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=clientes.js.map