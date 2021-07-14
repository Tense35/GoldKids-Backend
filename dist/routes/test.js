"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var tests_1 = require("../controllers/tests");
// Helpers y middlewares
var validar_campos_1 = require("../middlewares/validar-campos");
// Ruta para ejecución de pruebas
router.post('/', [
    express_validator_1.check('to', 'El destinatario es obligatorio').notEmpty(),
    express_validator_1.check('text', 'El texto es obligatorio').notEmpty(),
    validar_campos_1.validarCampos
], tests_1.postTest);
exports.default = router;
//# sourceMappingURL=test.js.map