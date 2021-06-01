"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var categorias_1 = require("../controllers/categorias");
// Helpers y middlewares
var dbv_categoria_1 = require("../helpers/dbv-categoria");
var validar_campos_1 = require("../middlewares/validar-campos");
// Rutas
// Obtener todas las categorías | !query: estado=false
router.get('/', categorias_1.getCategorias);
// Obtener una categoría | !query: estado=false
router.get('/:id_categoria', [
    express_validator_1.check('id_categoria').custom(dbv_categoria_1.categoriaNoExiste),
    validar_campos_1.validarCampos
], categorias_1.getCategoria);
// Crear un usuario
router.post('/', [
    express_validator_1.check('nombre', 'El nombre de la categoría es obligatorio').notEmpty(),
    validar_campos_1.validarCampos
], categorias_1.postCategoria);
router.put('/:id_categoria', [
    express_validator_1.check('id_categoria').custom(dbv_categoria_1.categoriaNoExiste),
    validar_campos_1.validarCampos
], categorias_1.putCategoria);
router.delete('/:id_categoria', [
    express_validator_1.check('id_categoria').custom(dbv_categoria_1.categoriaNoExiste),
    validar_campos_1.validarCampos
], categorias_1.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categorias.js.map