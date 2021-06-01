"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Terceros
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = express_1.Router();
// Controladores
var productos_1 = require("../controllers/productos");
// Helpers y middlewares
var dbv_categoria_1 = require("../helpers/dbv-categoria");
var dbv_producto_1 = require("../helpers/dbv-producto");
var validar_campos_1 = require("../middlewares/validar-campos");
// Rutas
// Obtener todos los productos | !query: estado=false
router.get('/', productos_1.getProductos);
// Obtener un producto | !query: estado=false
router.get('/:id_producto', [
    express_validator_1.check('id_producto').custom(dbv_producto_1.productoNoExiste),
    validar_campos_1.validarCampos
], productos_1.getProducto);
// Crear un producto
router.post('/', [
    express_validator_1.check('id_categoria', 'La identificación de la categoría es obligatoria').notEmpty(),
    validar_campos_1.validarCampos,
    express_validator_1.check('id_categoria').custom(dbv_categoria_1.categoriaNoExiste),
    express_validator_1.check('color', 'El color del producto es obligatorio').notEmpty(),
    express_validator_1.check('talla', 'La talla del producto es obligatoria').notEmpty(),
    express_validator_1.check('nombre', 'El nombre del producto es obligatorio').notEmpty(),
    express_validator_1.check('genero', 'El genero del producto es obligatorio').notEmpty(),
    express_validator_1.check('descripcion', 'La descripción del producto es obligatoria').notEmpty(),
    validar_campos_1.validarCampos
], productos_1.postProducto);
router.put('/:id_producto', [
    express_validator_1.check('id_producto').custom(dbv_producto_1.productoNoExiste),
    express_validator_1.check('id_categoria', 'El id_categoria es obligatorio').notEmpty(),
    validar_campos_1.validarCampos,
    express_validator_1.check('id_categoria').custom(dbv_categoria_1.categoriaNoExiste),
    validar_campos_1.validarCampos
], productos_1.putProducto);
router.delete('/:id_producto', [
    express_validator_1.check('id_producto').custom(dbv_producto_1.productoNoExiste),
    validar_campos_1.validarCampos
], productos_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map