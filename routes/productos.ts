// Terceros
import { Router } from 'express';
import { check } from 'express-validator'
const router = Router();

// Controladores
import { deleteProducto, getProducto, getProductos, postProducto, putProducto } from '../controllers/productos';

// Helpers y middlewares
import { categoriaNoExiste } from '../helpers/dbv-categoria';
import { productoNoExiste } from '../helpers/dbv-producto';
import { validarCampos } from '../middlewares/validar-campos';

// Rutas

// Obtener todos los productos | !query: estado=false
router.get('/', getProductos); 

// Obtener un producto | !query: estado=false
router.get('/:id_producto',
[
    check('id_producto').custom( productoNoExiste ),
    validarCampos
], getProducto);

// Crear un producto
router.post('/',
[
    check('id_categoria', 'La identificación de la categoría es obligatoria').notEmpty(),
    validarCampos,
    check('id_categoria').custom( categoriaNoExiste ),
    check('color', 'El color del producto es obligatorio').notEmpty(),
    check('talla', 'La talla del producto es obligatoria').notEmpty(),
    check('nombre', 'El nombre del producto es obligatorio').notEmpty(),
    check('genero', 'El genero del producto es obligatorio').notEmpty(),
    check('descripcion', 'La descripción del producto es obligatoria').notEmpty(),
    validarCampos
], postProducto);

router.put('/:id_producto',
[
    check('id_producto').custom( productoNoExiste ),
    validarCampos
], putProducto);

router.delete('/:id_producto',
[
    check('id_producto').custom( productoNoExiste ),
    validarCampos
], deleteProducto);

export default router;