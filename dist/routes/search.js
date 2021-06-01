"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var search_1 = require("../controllers/search");
// Helpers y middlewares
var v_rutas_1 = require("../helpers/v-rutas");
var validar_campos_1 = require("../middlewares/validar-campos");
// Rutas
// Obtener un producto | !query: estado=false
router.get('/:tabla/:campo/:termino', [
    express_validator_1.check('tabla').custom(v_rutas_1.rutaNoExiste),
    express_validator_1.check('campo', 'El campo es obligatorio').notEmpty(),
    express_validator_1.check('termino', 'El término es obligatorio').notEmpty(),
    validar_campos_1.validarCampos
], search_1.getSearch);
exports.default = router;
//# sourceMappingURL=search.js.map