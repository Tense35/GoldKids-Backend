"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var router = express_1.Router();
// Controladores
var tests_1 = require("../controllers/tests");
// Ruta para ejecución de pruebas
router.get('/', [
// check('id_usuario').custom( clienteNoExiste ),
// validarCampos
], tests_1.getTest);
exports.default = router;
//# sourceMappingURL=test.js.map